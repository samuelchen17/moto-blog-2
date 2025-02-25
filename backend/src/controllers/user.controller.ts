import { Request, Response, NextFunction } from "express";
import {
  deleteUserById,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getUsers,
} from "../services/user.services";
import { CustomError } from "../utils/errorHandler.utils";
import {
  IGetUser,
  IGetUserResponse,
  IPost,
  IPostWithAuthor,
  IProfileData,
  IUpdateUserPayload,
} from "src/types";
import { ISuccessRes } from "src/types";
import { authentication, random } from "../helpers/user.helpers";
import {
  getEmailValidationErrMsg,
  getPasswordValidationErrMsg,
  getUsernameValidationErrMsg,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../helpers/validator.helpers";
import { IUser, User } from "../models/user.model";
import { Post } from "../models/post.model";
import { attachAuthorsToPosts } from "./post.controller";
import { SortOrder } from "mongoose";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startIndex = parseInt(req.query.startIndex as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;

  // default sorting
  let sortField = "createdAt";
  let sortOrder: SortOrder = -1;

  const validFields = new Set(["createdAt", "username", "email", "isAdmin"]);

  try {
    const query: any = {};

    if (req.query.searchTerm) {
      query.$or = [
        { username: { $regex: req.query.searchTerm as string, $options: "i" } },
        { email: { $regex: req.query.searchTerm as string, $options: "i" } },
      ];
    }

    if (req.query.sort && req.query.order) {
      sortField = req.query.sort as string;

      // injection attack check
      if (!validFields.has(sortField)) {
        return next(new CustomError(400, "Invalid sorting field"));
      }
      sortOrder = req.query.order === "asc" ? 1 : -1;
    }

    const sortOptions: Record<string, SortOrder> = {
      [sortField]: sortOrder,
    };

    const users = await User.find<IGetUser>(query)
      .skip(startIndex)
      .limit(limit)
      .sort(sortOptions)
      .lean();

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
    next(new CustomError(400, "Failed to delete account"));
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
      .json({ message: "User has been signed out" });
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
    const { username, profilePicture, email, password, confirmPassword, bio } =
      req.body;

    const user = await getUserById(id);
    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    // update username
    if (username !== undefined) {
      if (username.trim() === "") {
        return next(new CustomError(400, "Username cannot be empty"));
      }

      // check against current username
      if (username.trim() === user.username) {
        return next(new CustomError(400, "Username has not changed"));
      }

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

    if (email !== undefined) {
      if (email.trim() === "") {
        return next(new CustomError(400, "Email cannot be empty"));
      }

      // check against current email
      if (email.trim() === user.email) {
        return next(new CustomError(400, "Email has not changed"));
      }

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

    // allow for empty string update to remove bio
    if (bio !== undefined) {
      if (bio.length > 300) {
        return next(new CustomError(400, "Bio cannot exceed 300 characters."));
      }
      user.bio = bio;
    }

    // update password

    if (password !== undefined) {
      if (password.trim() === "") {
        return next(new CustomError(400, "password cannot be empty"));
      }

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
        bio: user.bio,
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
    const user = await User.findById(req.params.userId);

    if (!user) {
      res.status(200).json({
        username: "Deleted User",
      });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    next(new CustomError(400, "failed to get user"));
  }
};

// get user saved posts
export const getUserSavedPosts = async (
  req: Request,
  res: Response<IPostWithAuthor[]>,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    const savedPosts: IPost[] = await Post.find({
      _id: { $in: user.savedPosts },
    }).lean();

    // using .map() here, it will retain the original order of the array
    // user.savedPost is in the correct order whereas savedPosts is not
    const orderedPosts = user.savedPosts
      .map((id) =>
        savedPosts.find((post) => post._id.toString() === id.toString())
      )
      .filter((post): post is IPost => Boolean(post));

    const savedPostsWithAuthors: IPostWithAuthor[] = await attachAuthorsToPosts(
      orderedPosts
    );

    res.status(200).json(savedPostsWithAuthors);
  } catch (err) {
    next(new CustomError(400, "failed to get user's saved post list"));
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IProfileData | null = await User.findById(
      req.params.userId
    ).select("username bio profilePicture createdAt isAdmin");

    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    res.status(200).json(user);
  } catch (err) {
    next(new CustomError(400, "failed to get user profile data"));
  }
};
