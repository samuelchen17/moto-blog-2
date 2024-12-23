import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";
import { Post } from "../models/post.model";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import { IPostResponse, IPost } from "@shared/types/post";
import { Config } from "../models/config.model";

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

export const getPosts = async (
  req: Request,
  res: Response<IPostResponse>,
  next: NextFunction
) => {
  const startIndex = parseInt(req.query.startIndex as string) || 0;
  const limit = parseInt(req.query.limit as string) || 9;
  // 1 = asc, -1 = desc
  const sortDirection = req.query.sort === "asc" ? 1 : -1;

  try {
    // construct the query as needed
    const query: IPostQuery = {};

    if (req.query.createdBy) {
      query.createdBy = req.query.createdBy as string;
    }

    if (req.query.category) {
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

    const posts = await Post.find<IPost>(query)
      .skip(startIndex)
      .limit(limit)
      .sort({ updatedAt: sortDirection });

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
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
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
  res: Response,
  next: NextFunction
) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);

    // implement delete all comments related to post

    res.status(200).json("Post has been deleted");
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
      return next(new CustomError(404, "Configuration not found"));
    }

    // extract post ids
    const postIds = config.hot_articles;

    const posts = await Post.find({
      _id: { $in: postIds },
    });

    if (posts.length === 0) {
      return next(new CustomError(404, "No hot articles found"));
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching hot articles:", err);
    next(new CustomError(500, "Failed to retrieve hot articles"));
  }
};
