import { Request, Response, NextFunction } from "express";
import { get, identity, merge } from "lodash";
import { getUserBySessionToken } from "../services/user.services";
import { CustomError } from "../utils/errorHandler.utils";
import { ObjectId } from "mongoose";

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string | undefined;

    if (!currentUserId) {
      return next(new CustomError(403, "User ID is missing"));
    }

    if (currentUserId.toString() !== id) {
      next(new CustomError(403, "User is not authorized"));
    }

    next();
  } catch (error) {
    next(new CustomError(400, "User is not authenticated"));
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["motoBlogAuthToken"];

    if (!sessionToken) {
      next(new CustomError(403, "Authentication token is missing"));
    }

    // check if there is existing user by this sessionToken
    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      next(new CustomError(403, "User session is invalid or has expired"));
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    next(new CustomError(400, "User is not authenticated"));
  }
};
