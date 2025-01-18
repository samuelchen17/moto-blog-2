import { Types } from "mongoose";
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
  savedPosts: (Types.ObjectId | IPost)[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateUserPayload {
  username?: string;
  profilePicture?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IGetUser {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  image: string;
}

export interface IGetUserResponse {
  users: IGetUser[];
  totalUsers: number;
  lastMonthUsers: number;
}
