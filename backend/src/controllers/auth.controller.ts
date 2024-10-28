import { NextFunction, Request, Response } from "express";
import {
  createUser,
  getUserByEmail,
  getUserByEmailOrUsername,
  getUserByUsername,
} from "../services/user.services";
import { random, authentication } from "../utils/user.utils";
import { CustomError } from "../utils/errorHandler.utils";
import {
  IGoogleAuthPayload,
  ISignInAuthPayload,
  ISignUpAuthPayload,
  IAuthSuccessRes,
} from "@shared/types/auth";

export const register = async (
  // first param: route parameters like /:id
  // second param: query params like ?tab=profile
  // third param: body of request
  req: Request<{}, {}, ISignUpAuthPayload>,
  res: Response<IAuthSuccessRes>,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return next(new CustomError(400, "All fields are required"));
    }

    // validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new CustomError(400, "Invalid email format"));
    }

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
      profilePicture:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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
      },
    });
  } catch (error) {
    next(new CustomError(500, "Internal server error"));
  }
};

export const login = async (
  req: Request<{}, {}, ISignInAuthPayload>,
  res: Response<IAuthSuccessRes>,
  next: NextFunction
) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return next(new CustomError(400, "All fields are required"));
    }

    const user = await getUserByEmailOrUsername(
      emailOrUsername,
      "email + username + profilePicture + authentication.salt + authentication.password"
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

    // add sessionToken to user in db
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    // save session token
    await user.save();

    // deployment
    // const cookieDomain = process.env.NODE_ENV === 'production' ? 'yourdomain.com' : 'localhost';

    res.cookie("motoBlogAuthToken", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/", // cookie valid for all paths
      httpOnly: true, // prevent JS access to cookie to reduce XSS attacks
      secure: false, // set to true if using https
      // secure: process.env.NODE_ENV === 'production', // Use secure cookies only in production
      // sameSite: "Strict", // helps prevent csrf attacks
      maxAge: 3600000,
    });

    console.log(user);

    res.status(200).json({
      message: "Successfully logged in",
      success: true,
      user: {
        id: user._id.toString(),
        username: user.username,
        profilePicture: user.profilePicture,
        email: user.email,
      },
    });
  } catch (error) {
    next(new CustomError(500, "Failed to log user in"));
  }
};

export const googleAuth = async (
  req: Request<{}, {}, IGoogleAuthPayload>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, dpUrl } = req.body;
  } catch (error) {
    next(new CustomError(500, "Failed to log user in via Google"));
  }
};
