import mongoose from "mongoose";
import { Document, Types } from "mongoose";
import config from "../config/config";
import { IPost } from "src/types";

export interface IUser {
  username: string;
  email: string;
  profilePicture: string;
  authentication: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
  isAdmin: boolean;
  bio: string;
  savedPosts: (Types.ObjectId | IPost)[];
  likedPosts: (Types.ObjectId | IPost)[];
  createdAt: Date;
  updatedAt: Date;
}

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
    bio: {
      type: String,
      default: "",
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
