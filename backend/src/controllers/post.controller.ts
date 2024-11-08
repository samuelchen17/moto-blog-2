import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";
import { Post } from "../models/post.model";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export const createPost = async (
  req: Request,
  res: Response,
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

    const newPost = new Post({
      ...req.body,
      content: sanitizedContent,
      slug,
      createdBy: req.params.id,
    });

    const savedPost = await newPost.save();

    // mongodb unique issue, implement
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error creating post:", err);
    next(new CustomError(500, "Failed to create post"));
  }
};

export const getPosts = async (
  req: Request<{}, { query: string }, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    // 1 = asc, -1 = desc
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find(...(req.query.userId && { user }));
  } catch (error) {
    next(new CustomError(400, "Unable to get users"));
  }
};
