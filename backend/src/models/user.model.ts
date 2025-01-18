import mongoose from "mongoose";
import { Document, Types } from "mongoose";
import config from "../config/config";
import { IUser } from "src/types";

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: config.displayPicture.default,
    },
    authentication: {
      password: {
        type: String,
        required: true,
        select: false,
      },
      salt: {
        type: String,
        select: false,
      },
      sessionToken: {
        type: String,
        select: false,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

// user Document type
export type UserDocument = Document &
  IUser & {
    _id: Types.ObjectId;
    __v?: number;
  };

export const User = mongoose.model("User", userSchema);
