import { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";
import {
  checkAdminById,
  getUserBySessionToken,
} from "../services/user.services";
import { CustomError } from "../utils/errorHandler.utils";
// import { ObjectId } from "mongoose";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // retrieve session token from cookies of incoming request, set when user logs in
    const sessionToken = req.cookies["motoBlogAuthToken"];
    if (!sessionToken) {
      next(new CustomError(403, "Authentication token is missing"));
    }

    // check if there is existing user by this sessionToken, valid if true
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      next(new CustomError(403, "User session is invalid or has expired"));
    }

    // data is merged into req object, accessed by req.identity
    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    next(new CustomError(400, "User is not authenticated"));
  }
};

// check if current user is the owner of the id param
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

// check if current user is admin
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const admin = await checkAdminById(id);

    if (admin) {
      next();
    } else {
      next(new CustomError(403, "User is not an admin"));
    }
  } catch (error) {
    next(new CustomError(500, "An error occurred while checking admin status"));
  }
};

export const isAdminOrOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    // this will get the identity from the req token
    const currentUserId = get(req, "identity._id") as string | undefined;
    const isAdmin = get(req, "identity.isAdmin") as boolean | undefined;

    if (!currentUserId) {
      return next(new CustomError(403, "User ID is missing"));
    }

    if (currentUserId.toString() === id) {
      return next();
    }

    if (isAdmin) {
      const admin = await checkAdminById(id);
      if (admin) {
        return next();
      }
    }

    next(new CustomError(403, "User is not authorized"));
  } catch (err) {
    next(new CustomError(500, "An error occurred"));
  }
};
