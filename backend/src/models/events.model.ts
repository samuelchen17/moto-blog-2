import mongoose from "mongoose";
import { IEvents } from "src/types";
import config from "../config/config";

const postSchema = new mongoose.Schema<IEvents>(
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
    category: {
      type: String,
      default: "motoce event",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
