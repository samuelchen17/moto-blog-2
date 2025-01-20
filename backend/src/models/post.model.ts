import mongoose from "mongoose";
import { IPost } from "src/types";
import config from "../config/config";

const postSchema = new mongoose.Schema<IPost>(
  {
    createdBy: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // implement default photo
      default: config.postImage.default,
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    saves: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
