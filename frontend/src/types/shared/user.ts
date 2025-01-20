import { IPost } from "src/types";

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
  savedPosts: (string | IPost)[];
  likedPosts: (string | IPost)[];
  createdAt: Date;
  updatedAt: Date;
  image: string;
}

export interface IGetUserResponse {
  users: IGetUser[];
  totalUsers: number;
  lastMonthUsers: number;
}
