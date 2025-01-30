import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";
import { Post } from "../models/post.model";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import {
  IPostResponse,
  IPost,
  IPostWithAuthor,
  IUserRes,
  IPostDeleteResponse,
} from "src/types";
import { Config } from "../models/config.model";
import { User } from "../models/user.model";
import mongoose, { SortOrder } from "mongoose";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

interface IPostQuery {
  createdBy?: string;
  category?: string;
  slug?: string;
  _id?: string;
  $or?: Array<
    | { title?: { $regex: string; $options: string } }
    | { content?: { $regex: string; $options: string } }
  >;
}

// Helper function to fetch authors and attach them to posts
export const attachAuthorsToPosts = async (
  posts: IPost[]
): Promise<IPostWithAuthor[]> => {
  // Step 1: Extract unique author IDs
  const authorIds = [...new Set(posts.map((post) => post.createdBy))];

  // fetch authors
  const authors = await User.find(
    { _id: { $in: authorIds } },
    "username profilePicture"
  ).lean();

  // author map for constant time lookup
  const authorMap: Record<string, IUserRes> = {};
  authors.forEach((author) => {
    authorMap[author._id.toString()] = {
      ...author,
      _id: author._id.toString(),
    };
  });

  // attach author data to each post
  const postsWithAuthors: IPostWithAuthor[] = posts.map((post) => ({
    ...post,
    createdBy: authorMap[post.createdBy], // Add author details or null if not found
  }));

  return postsWithAuthors;
};

export const getPosts = async (
  req: Request,
  res: Response<IPostResponse>,
  next: NextFunction
) => {
  const startIndex = parseInt(req.query.startIndex as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;
  // 1 = asc, -1 = desc
  const sortDirection = req.query.sort === "asc" ? 1 : -1;

  try {
    // construct the query based on search params
    const query: IPostQuery = {};

    if (req.query.createdBy) {
      query.createdBy = req.query.createdBy as string;
    }

    if (req.query.category && req.query.category !== "all") {
      query.category = req.query.category as string;
    }

    if (req.query.slug) {
      query.slug = req.query.slug as string;
    }

    if (req.query.postId) {
      query._id = req.query.postId as string;
    }

    if (req.query.searchTerm) {
      query.$or = [
        { title: { $regex: req.query.searchTerm as string, $options: "i" } },
        { content: { $regex: req.query.searchTerm as string, $options: "i" } },
      ];
    }

    // fetch posts
    const posts = await Post.find<IPost>(query)
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: sortDirection })
      .lean();

    const postsWithAuthors: IPostWithAuthor[] = await attachAuthorsToPosts(
      posts
    );

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts: postsWithAuthors,
      totalPosts,
      lastMonthPosts,
    });
  } catch (err) {
    console.error("Error retrieving posts:", err);
    next(new CustomError(500, "Failed to retrieve posts"));
  }
};

export const createPost = async (
  req: Request,
  res: Response<IPost>,
  next: NextFunction
) => {
  try {
    if (!req.body.title || !req.body.content) {
      next(
        new CustomError(400, "Please fill out all required fields for post")
      );
    }

    // check duplicate title
    const existingPost = await Post.findOne({ title: req.body.title });
    if (existingPost) {
      return next(
        new CustomError(400, "A post with this title already exists")
      );
    }

    // prevent xss
    const sanitizedContent = purify.sanitize(req.body.content);

    // implement preserve id
    // const sanitizedContent = purify(req.body.content, {
    //   ADD_ATTR: ["id"], // Preserve `id` attributes
    // });

    // url friendly version of title
    const slug = req.body.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // check existing slug
    const existingSlug = await Post.findOne({ slug: slug });
    if (existingSlug) {
      return next(new CustomError(400, "Slug for post already exists"));
    }

    const newPost = new Post<IPost>({
      ...req.body,
      content: sanitizedContent,
      slug,
      createdBy: req.params.id,
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      ...savedPost.toObject(),
      // cast _id as string, instead of ObjectId, to fix ts error for IPost
      _id: savedPost._id.toString(),
    });
  } catch (err) {
    console.error("Error creating post:", err);
    next(new CustomError(500, "Failed to create post"));
  }
};

export const deletePost = async (
  req: Request,
  res: Response<IPostDeleteResponse>,
  next: NextFunction
) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);

    if (!deletedPost) {
      return next(new CustomError(404, "Post not found"));
    }

    // implement delete all comments related to post

    res.status(200).json({
      data: deletedPost,
      message: "Post has been deleted",
    });
  } catch (err) {
    console.error("Error deleting post:", err);
    next(new CustomError(500, "Failed to delete post"));
  }
};

// export const updatePost = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { postId } = req.params;
//     if (!postId) {
//       next(new CustomError(400, "Post ID is required"));
//     }

//     const updatedPost = await Post.findByIdAndUpdate(
//       req.params.postId,
//       // {
//       //   $set: {
//       //     title: req.body.title,
//       //     content: req.body.content,
//       //     category: req.body.category,
//       //     image: req.body.image,
//       //   },
//       // },
//       { $set: { ...req.body } }, // partial updates
//       { new: true }
//     );

//     res.status(200).json(updatedPost);
//   } catch (err) {
//     console.error("Error updating post:", err);
//     next(new CustomError(500, "Failed to update post"));
//   }
// };

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      next(new CustomError(400, "Post ID is required"));
    }

    const updates = { ...req.body };

    // if title is changed, update slug also
    if (req.body.title) {
      updates.slug = req.body.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      // check existing slug
      const existingSlug = await Post.findOne({
        slug: updates.slug,
        _id: { $ne: postId }, // Exclude the current post
      });
      if (existingSlug) {
        return next(new CustomError(400, "Slug for post already exists"));
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      // {
      //   $set: {
      //     title: req.body.title,
      //     content: req.body.content,
      //     category: req.body.category,
      //     image: req.body.image,
      //   },
      // },
      { $set: updates }, // partial updates
      { new: true }
    );

    if (!updatedPost) {
      return next(new CustomError(404, "Post not found"));
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("Error updating post:", err);
    next(new CustomError(500, "Failed to update post"));
  }
};

export const getHotPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // construct the query as needed
    const config = await Config.findOne({ _id: "config" });

    if (!config) {
      return next(new CustomError(404, "Hot post configuration not found"));
    }

    // extract post ids
    const postIds = config.hot_articles;

    const posts = await Post.find({
      _id: { $in: postIds },
    }).lean();

    if (posts.length === 0) {
      return next(new CustomError(404, "No hot articles found"));
    }

    const postsWithAuthors: IPostWithAuthor[] = await attachAuthorsToPosts(
      posts
    );

    res.status(200).json(postsWithAuthors);
  } catch (err) {
    console.error("Error retrieving hot articles:", err);
    next(new CustomError(500, "Failed to retrieve hot articles"));
  }
};

export const toggleSavePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId, id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    // convert string post id to mongoose object id
    const objectIdPostId = new mongoose.Types.ObjectId(postId);
    const isPostSaved = user.savedPosts.includes(objectIdPostId);

    const updateSave = isPostSaved
      ? { $pull: { savedPosts: objectIdPostId } } // remove if saved
      : { $addToSet: { savedPosts: postId } }; // add if not

    const updateSaveNumber = { $inc: { saves: isPostSaved ? -1 : 1 } };

    await User.findByIdAndUpdate(id, updateSave, { timestamps: false });
    await Post.findByIdAndUpdate(postId, updateSaveNumber, {
      timestamps: false,
    });

    // implement send something back

    const post = await Post.findById(postId);
    if (post) {
      res.status(200).json({
        message: isPostSaved
          ? "Post unsaved successfully"
          : "Post saved successfully",
        post,
      });
    }
  } catch (err) {
    console.error("Error adding post to saved list:", err);
    next(new CustomError(500, "Failed to save post to user collection"));
  }
};

export const toggleLikePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId, id } = req.params;

  try {
    const user = await User.findById(id);
    const post = await Post.findById(postId);

    if (!user) {
      return next(new CustomError(404, "User not found"));
    }

    if (!post) {
      return next(new CustomError(404, "Post not found"));
    }

    // convert string post id to mongoose object id
    const objectIdPostId = new mongoose.Types.ObjectId(postId);
    const isPostLiked = user.likedPosts.includes(objectIdPostId);

    const updateLike = isPostLiked
      ? { $pull: { likedPosts: objectIdPostId } } // remove if liked
      : { $addToSet: { likedPosts: postId } }; // add if not

    const updateLikeNumber = { $inc: { likes: isPostLiked ? -1 : 1 } };

    await User.findByIdAndUpdate(id, updateLike, { timestamps: false });
    await Post.findByIdAndUpdate(postId, updateLikeNumber, {
      timestamps: false,
    });

    // implement send something back

    res.status(200).json({
      message: isPostLiked
        ? "Like removed successful"
        : "Post liked successful",
      post,
    });
  } catch (err) {
    console.error("Error liking post:", err);
    next(new CustomError(500, "Failed to like post"));
  }
};

// const user = await User.findById(userId).populate("savedPosts");
// console.log(user.savedPosts); // Array of saved posts

// const post = await Post.findById(postId);
// console.log(post.saves); // Total saves count

export const getDashPosts = async (
  req: Request,
  res: Response<IPostResponse>,
  next: NextFunction
) => {
  const startIndex = parseInt(req.query.startIndex as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;

  // default sorting
  let sortField = "createdAt";
  let sortOrder: SortOrder = -1;

  const validFields = new Set(["createdAt", "title", "category"]);

  try {
    // construct the query based on search params
    const query: IPostQuery = {};

    if (req.query.searchTerm) {
      query.$or = [
        { title: { $regex: req.query.searchTerm as string, $options: "i" } },
        { content: { $regex: req.query.searchTerm as string, $options: "i" } },
      ];
    }

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

    // fetch posts
    const posts = await Post.find<IPost>(query)
      .skip(startIndex)
      .limit(limit)
      .sort(sortOptions)
      .lean();

    const postsWithAuthors: IPostWithAuthor[] = await attachAuthorsToPosts(
      posts
    );

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts: postsWithAuthors,
      totalPosts,
      lastMonthPosts,
    });
  } catch (err) {
    console.error("Error retrieving posts:", err);
    next(new CustomError(500, "Failed to retrieve posts"));
  }
};
