import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";
import { Comment } from "../models/comment.model";

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, postId, commentBy } = req.body;

    const newComment = new Comment({
      content,
      postId,
      commentBy,
    });

    await newComment.save();

    res.status(200).json(newComment);
  } catch (err) {
    console.error("Error posting comment:", err);
    next(new CustomError(500, "Failed to post comment"));
  }
};
