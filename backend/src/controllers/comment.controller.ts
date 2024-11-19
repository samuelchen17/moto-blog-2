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

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error("Error getting comments:", err);
    next(new CustomError(500, "Failed to get comments"));
  }
};

export const likeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      next(new CustomError(404, "Comment not found"));
    }

    // using indexOf so that like can be removed based on index
    // returns -1 if not found
    const userIndex = comment?.likes.indexOf(req.user.id);
    if (comment?.likes.includes(req.user.id)) {
    }
  } catch (err) {
    console.error("Error liking comment:", err);
    next(new CustomError(500, "Failed to like comment"));
  }
};
