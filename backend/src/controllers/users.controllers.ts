import { Request, Response, NextFunction } from "express";
import {
  deleteUserById,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getUsers,
} from "../services/user.services";
import { CustomError } from "../utils/errorHandler.utils";
import { IUpdateUserPayload } from "@shared/types/auth";
import { authentication, random } from "../helpers/user.helpers";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsers();

    res.status(200).json({ message: "Got all users", users: users });
  } catch (error) {
    next(new CustomError(400, "Unable to get users"));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      next(new CustomError(404, "User does not exist"));
    }

    res.status(200).json({ message: "User deleted", deletedUser: deletedUser });
  } catch (error) {
    next(new CustomError(400, "Unable to delete user"));
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { username, profilePicture, email, password } = req.body;

    const user = await getUserById(id);
    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    // update username
    if (username) {
      // validate username format
      const usernameRegex = /^(?=.{3,16}$)[a-z0-9_]+$/;
      if (!usernameRegex.test(username)) {
        return next(new CustomError(400, "Invalid username format"));
      }
      // check for duplicate username
      const existingUsername = await getUserByUsername(username);
      if (existingUsername) {
        return next(new CustomError(400, "Username already in use"));
      }
      user.username = username;
    }

    // update email
    if (email) {
      // validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return next(new CustomError(400, "Invalid email format"));
      }
      // check for duplicate email
      const existingEmail = await getUserByEmail(username);
      if (existingEmail) {
        return next(new CustomError(400, "Email already in use"));
      }
      user.email = email;
    }

    // update profile picture
    if (profilePicture) {
      user.profilePicture = profilePicture;
    }

    // update password
    if (password) {
      const salt = random();
      const hashedPassword = authentication(salt, password);
      user.authentication.password = hashedPassword;
      user.authentication.salt = salt;
    }

    // save updated details
    await user.save();

    // send response back to user
    res
      .status(200)
      .json({ message: "User details updated successfully", user });
  } catch (error) {
    next(new CustomError(400, "Unable to update details"));
  }
};
