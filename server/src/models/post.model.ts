import mongoose from "mongoose";

export interface IPost extends Document {
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// export const PostBlog = mongoose.model("Post", postSchema);
