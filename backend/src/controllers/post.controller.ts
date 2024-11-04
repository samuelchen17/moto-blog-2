import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";
import { Post } from "../models/post.model";

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

    const newPost = new Post({ ...req.body, slug, createdBy: req.params._id });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    next(new CustomError(500, "Failed to create post"));
  }
};
