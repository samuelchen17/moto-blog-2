import mongoose from "mongoose";
import { IPost } from "@shared/types/post";
import config from "../config/config";

// interface IPost extends Document {
//   createdBy: string;
//   title: string;
//   content: string;
//   image: string;
//   category: string;
//   slug: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

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
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
