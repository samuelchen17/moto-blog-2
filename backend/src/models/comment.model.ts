import mongoose from "mongoose";

interface IComment {
  postId: string;
  commentBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new mongoose.Schema<IComment>({});
