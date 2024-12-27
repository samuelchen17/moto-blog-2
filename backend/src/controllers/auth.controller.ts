import { NextFunction, Request, Response } from "express";
import {
  createUser,
  getUserByEmail,
  getUserByEmailOrUsername,
  getUserByUsername,
} from "../services/user.services";
import { random, authentication } from "../helpers/user.helpers";
import { CustomError } from "../utils/errorHandler.utils";
import {
  IGoogleAuthPayload,
  ISignInAuthPayload,
  ISignUpAuthPayload,
} from "src/types";
import { ISuccessRes } from "src/types";
import { UserDocument } from "../models/user.model";
import {
  getEmailValidationErrMsg,
  getPasswordValidationErrMsg,
  getUsernameValidationErrMsg,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../helpers/validator.helpers";

const handleLoginResponse = async (
  user: UserDocument,
  res: Response<ISuccessRes>
) => {
  // add sessionToken to user in db
  const salt = random();
  user.authentication.sessionToken = authentication(salt, user._id.toString());

  // save session token
  await user.save();

  // implement prod
  // const cookieDomain = process.env.NODE_ENV === 'production' ? 'yourdomain.com' : 'localhost';

  res.cookie("motoBlogAuthToken", user.authentication.sessionToken, {
    domain: "localhost",
    path: "/", // cookie valid for all paths
    httpOnly: true, // prevent JS access to cookie to reduce XSS attacks
    secure: process.env.NODE_ENV === "production", // set to true if using https
    // sameSite: "Strict", // helps prevent csrf attacks
    maxAge: 3600000, // 1 hour
  });

  res.status(200).json({
    message: "Successfully logged in",
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
};

export const register = async (
  // first param: route parameters like /:id
  // second param: query params like ?tab=profile
  // third param: body of request
  req: Request<{}, {}, ISignUpAuthPayload>,
  res: Response<ISuccessRes>,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return next(new CustomError(400, "All fields are required"));
    }

    // validate email format
    if (!validateEmail(email)) {
      return next(new CustomError(400, getEmailValidationErrMsg()));
    }

    // validate username format
    if (!validateUsername(username)) {
      return next(new CustomError(400, getUsernameValidationErrMsg()));
    }

    // validate password format implement
    // if (!validatePassword(password)) {
    //   return next(new CustomError(400, getPasswordValidationErrMsg()));
    // }

    // check if already exists
    const existingUser = await getUserByEmail(email);
    const existingUsername = await getUserByUsername(username);

    if (existingUser) {
      return next(new CustomError(400, "Email already in use"));
    }
    if (existingUsername) {
      return next(new CustomError(400, "Username already in use"));
    }

    // generate salt and hash pw
    const salt = random();
    const hashedPassword = authentication(salt, password); // custom authentication hash

    const newUser = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      return next(new CustomError(400, "Failed to create account"));
    }

    res.status(201).json({
      message: "Successfully registered",
      success: true,
      user: {
        id: newUser._id.toString(),
        username: newUser.username,
        profilePicture: newUser.profilePicture,
        email: newUser.email,
        dateJoined: newUser.createdAt,
        admin: newUser.isAdmin,
      },
    });
  } catch (err) {
    console.error("Error creating post:", err);
    next(new CustomError(500, "Internal server error"));
  }
};

export const login = async (
  req: Request<{}, {}, ISignInAuthPayload>,
  res: Response<ISuccessRes>,
  next: NextFunction
) => {
  try {
    // implement: disable username login, use it as displayname
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return next(new CustomError(400, "All fields are required"));
    }

    const user = await getUserByEmailOrUsername(
      emailOrUsername,
      "authentication.salt authentication.password"
    );

    if (!user) {
      return next(new CustomError(401, "Incorrect email or password"));
    }

    // check if these properties exist so that it cannot be undefined
    if (!user.authentication.salt || !user.authentication.password) {
      return next(new CustomError(500, "Authentication data is missing"));
    }

    // compare hash to check password
    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return next(new CustomError(401, "Incorrect email or password"));
    }

    // sign user in
    handleLoginResponse(user, res);
  } catch (error) {
    next(new CustomError(500, "Failed to log user in"));
  }
};

export const googleAuth = async (
  req: Request<{}, {}, IGoogleAuthPayload>,
  res: Response<ISuccessRes>,
  next: NextFunction
) => {
  try {
    const { email, name, dpUrl } = req.body;

    // check if user exists
    const existingUser = await getUserByEmail(email);
    // if user exists, sign user in
    if (existingUser) {
      const user = await getUserByEmail(
        email,
        "authentication.salt authentication.password"
      );

      if (!user) {
        return next(new CustomError(401, "User does not exist"));
      }

      // sign user in
      handleLoginResponse(user, res);
    } else {
      // create account for user

      // randomly generate password for user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const salt = random();
      const hashedPassword = authentication(salt, generatedPassword);

      // create new account based on google auth
      const newUser = await createUser({
        email,
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        profilePicture: dpUrl,
        authentication: {
          salt,
          password: hashedPassword,
        },
      });

      if (!newUser) {
        return next(new CustomError(400, "Failed to create account"));
      }

      // sign user in
      handleLoginResponse(newUser, res);
    }
  } catch (error) {
    next(new CustomError(500, "Google Auth failed"));
  }
};
