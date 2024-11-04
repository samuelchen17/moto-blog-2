import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.title || !req.body.content) {
      next(new CustomError(400, "Please fill out all required fields"));
    }

    // url friendly version of title
    const slug = req.body.title
      .split("")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const newPost = { ...req.body, slug, createdBy: req.user.id };
  } catch (err) {
    next(new CustomError(500, "Failed to create post"));
  }
};
