import { Request, Response, NextFunction } from "express";
import {
  deleteUserById,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getUsers,
} from "../services/user.services";
import { CustomError } from "../utils/errorHandler.utils";

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

export const updateUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      next(new CustomError(404, "Please fill out all fields"));
    }

    const user = await getUserById(id);

    const existingUsername = await getUserByUsername(username);

    if (existingUsername) {
      return next(new CustomError(400, "Username already in use"));
    }

    user!.username = username;
    await user!.save();

    res.status(200).json({ message: "Username updated", user });
  } catch (error) {
    next(new CustomError(400, "Unable to update details"));
  }
};
