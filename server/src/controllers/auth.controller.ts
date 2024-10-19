import { NextFunction, Request, Response } from "express";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "../services/user.services";
import { random, authentication } from "../utils/user.utils";
import { CustomError } from "../utils/errorHandler.utils";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return next(new CustomError(400, "All fields are required"));
    }

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

    res.status(201).json({ message: "Successfully registered", user: newUser });
  } catch (error) {
    next(new CustomError(500, "Failed to register user"));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new CustomError(400, "All fields are required"));
    }

    const user = await getUserByEmail(
      email,
      "authentication.salt + authentication.password"
    );

    if (!user) {
      return next(new CustomError(400, "User not found"));
    }

    // check if these properties exist so that it cannot be undefined
    if (!user.authentication.salt || !user.authentication.password) {
      return next(new CustomError(500, "Authentication data is missing"));
    }

    // compare hash to check password
    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      next(new CustomError(403, "Incorrect email or password"));
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

    res.status(200).json({ message: "Successfully logged in", user: user });
  } catch (error) {
    next(new CustomError(500, "Failed to log user in"));
  }
};
