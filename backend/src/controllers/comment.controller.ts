import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";
import { Comment } from "../models/comment.model";
import { Post } from "../models/post.model";
import { ICommentResponse, IAllCommentResponse, IComment } from "src/types";
import { SortOrder } from "mongoose";

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

    // add 1 to post comment total count
    await Post.findByIdAndUpdate(postId, { $inc: { comments: 1 } });

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

    const editedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );

    if (!editedComment) {
      return next(new CustomError(404, "Comment not found"));
    }

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
    ).lean();

    if (!deletedComment) {
      return next(new CustomError(404, "Comment not found"));
    }

    await Post.findByIdAndUpdate(deletedComment.postId, {
      $inc: { comments: -1 },
    });

    res.status(200).json({ message: "Comment has been deleted" });
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
    const limit = parseInt(req.query.limit as string) || 10;
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

// get comments for one user
export const getUserComments = async (
  req: Request,
  res: Response<ICommentResponse>,
  next: NextFunction
) => {
  const startIndex = parseInt(req.query.startIndex as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;

  // default sorting
  let sortField = "createdAt";
  let sortOrder: SortOrder = -1;
  const validFields = new Set(["createdAt", "numberOfLikes"]);

  try {
    if (req.query.sort && req.query.order) {
      sortField = req.query.sort as string;

      // injection attack check
      if (!validFields.has(sortField)) {
        return next(new CustomError(400, "Invalid sorting field"));
      }
      sortOrder = req.query.order === "asc" ? 1 : -1;
    }

    const sortOptions: Record<string, SortOrder> = {
      [sortField]: sortOrder,
    };

    const comments = await Comment.find({ commentBy: req.params.id })
      .skip(startIndex)
      .limit(limit)
      .sort(sortOptions)
      .lean();

    const totalComments = await Comment.countDocuments({
      commentBy: req.params.id,
    });

    // res.status(200).json({ comments, totalComments });

    // get unique postID
    const postIds = [...new Set(comments.map((comment) => comment.postId))];

    // fetch posts in parallel
    const posts = await Post.find({ _id: { $in: postIds } })
      .select("title slug _id")
      .lean();

    // create map of postId -> post object
    const postMap = new Map(posts.map((post) => [post._id.toString(), post]));

    // attach post to comments
    const updatedComments = comments.map((comment) => ({
      ...comment,
      post: postMap.get(comment.postId.toString()) || null,
    }));

    res.status(200).json({ comments: updatedComments, totalComments });
  } catch (err) {
    console.error("Error getting comments:", err);
    next(new CustomError(500, "Failed to get comments"));
  }
};
