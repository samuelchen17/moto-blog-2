import mongoose from "mongoose";
import { IComment } from "src/types";

const commentSchema = new mongoose.Schema<IComment>(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    commentBy: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
