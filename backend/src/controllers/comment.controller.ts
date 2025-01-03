import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";
import { Comment } from "../models/comment.model";
import { ICommentResponse, IAllCommentResponse } from "src/types";

// no need to sanitize or check if fields are missing

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

export const likeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId, userId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(new CustomError(404, "Comment not found"));
    }

    // using indexOf so that like can be removed based on index
    // returns -1 if not found
    const userIndex = comment.likes.indexOf(userId);

    if (userIndex !== -1) {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    } else {
      comment.numberOfLikes += 1;
      comment.likes.push(userId);
    }

    await comment.save();

    res.status(200).json(comment);
  } catch (err) {
    console.error("Error liking comment:", err);
    next(new CustomError(500, "Failed to like comment"));
  }
};

export const editComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(new CustomError(404, "Comment not found"));
    }

    const editedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );

    res.status(200).json(editedComment);
  } catch (err) {
    console.error("Error editing comment:", err);
    next(new CustomError(500, "Failed to edit comment"));
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentId
    );

    if (!deletedComment) {
      return next(new CustomError(404, "Comment not found"));
    }
    res.status(200).json("Comment has been deleted");
  } catch (err) {
    console.error("Error deleting comment:", err);
    next(new CustomError(500, "Failed to delete comment"));
  }
};

export const getAllComments = async (
  req: Request,
  res: Response<IAllCommentResponse>,
  next: NextFunction
) => {
  try {
    const startIndex = parseInt(req.query.startIndex as string) || 0;
    const limit = parseInt(req.query.limit as string) || 9;
    const sortDirection = req.query.order === "asc" ? -1 : 1;

    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalComments = await Comment.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      comments,
      totalComments,
      lastMonthComments,
    });
  } catch (err) {
    next(new CustomError(500, "Failed to get all comment"));
  }
};

// get comments for one post
export const getComments = async (
  req: Request,
  res: Response<ICommentResponse>,
  next: NextFunction
) => {
  try {
    const startIndex = parseInt(req.query.startIndex as string) || 0;
    const limit = parseInt(req.query.limit as string) || 3;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalComments = await Comment.countDocuments({
      postId: req.params.postId,
    });

    res.status(200).json({ comments, totalComments });
  } catch (err) {
    console.error("Error getting comments:", err);
    next(new CustomError(500, "Failed to get comments"));
  }
};

// export const getComments = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const comments = await Comment.find({ postId: req.params.postId }).sort({
//       createdAt: -1,
//     });

//     res.status(200).json(comments);
//   } catch (err) {
//     console.error("Error getting comments:", err);
//     next(new CustomError(500, "Failed to get comments"));
//   }
// };
