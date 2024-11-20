import { Request, Response, NextFunction } from "express";
import {
  deleteUserById,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getUsers,
} from "../services/user.services";
import { CustomError } from "../utils/errorHandler.utils";
import { IUpdateUserPayload } from "@shared/types/user";
import { ISuccessRes } from "@shared/types/res";
import { authentication, random } from "../helpers/user.helpers";
import {
  getEmailValidationErrMsg,
  getPasswordValidationErrMsg,
  getUsernameValidationErrMsg,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../helpers/validator.helpers";
import { User } from "../models/user.model";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startIndex = parseInt(req.query.startIndex as string) || 0;
  const limit = parseInt(req.query.limit as string) || 9;
  // 1 = asc, -1 = desc
  const sortDirection = req.query.order === "asc" ? -1 : 1;

  try {
    // const users = await getUsers();

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users,
      totalUsers,
      lastMonthUsers,
    });
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

export const deleteUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { deleteId } = req.params;

    const deletedUser = await deleteUserById(deleteId);

    if (!deletedUser) {
      next(new CustomError(404, "User does not exist"));
    }

    res.status(200).json({ message: "User deleted", deletedUser: deletedUser });
  } catch (error) {
    next(new CustomError(400, "Unable to delete user"));
  }
};

export const signOut = (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .clearCookie("motoBlogAuthToken")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(new CustomError(400, "Unable to sign user out"));
  }
};

export const updateUser = async (
  req: Request<{ id: string }, {}, IUpdateUserPayload>,
  res: Response<ISuccessRes>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { username, profilePicture, email, password, confirmPassword } =
      req.body;

    const user = await getUserById(id);
    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    // update username
    if (username) {
      // validate username format
      if (!validateUsername(username)) {
        return next(new CustomError(400, getUsernameValidationErrMsg()));
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
      if (!validateEmail(email)) {
        return next(new CustomError(400, getEmailValidationErrMsg()));
      }
      // check for duplicate email
      const existingEmail = await getUserByEmail(email);
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
      // validate password format implement
      // if (!validatePassword(password)) {
      //   return next(new CustomError(400, getPasswordValidationErrMsg()));
      // }

      if (!confirmPassword) {
        return next(new CustomError(400, "Please confirm password"));
      }

      if (password !== confirmPassword) {
        return next(new CustomError(400, "Password does not match"));
      }

      const salt = random();
      const hashedPassword = authentication(salt, password);
      user.authentication.password = hashedPassword;
      user.authentication.salt = salt;
    }

    // save updated details
    await user.save();

    res.status(200).json({
      message: "User details updated successfully",
      success: true,
      user: {
        id: user._id.toString(),
        username: user.username,
        profilePicture: user.profilePicture,
        email: user.email,
        dateJoined: user.createdAt,
        admin: user.isAdmin,
      },
    });
  } catch (error) {
    next(new CustomError(400, "Unable to update details"));
  }
};

// get singular user
// if user is deleted, still send success
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.commentBy);

    if (!user) {
      res.status(200).json({ username: "Deleted User" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    next(new CustomError(400, "failed to get user"));
  }
};
