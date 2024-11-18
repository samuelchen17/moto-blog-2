import mongoose from "mongoose";
import { Document, Types } from "mongoose";
import config from "../config/config";

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
