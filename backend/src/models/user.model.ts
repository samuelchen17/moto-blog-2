import mongoose from "mongoose";
import { Document, Types } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  profilePicture: string;
  authentication: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
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
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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
