import mongoose from "mongoose";

// implement, refactor all interfaces to use for response type and frontend type

export interface IPost extends Document {
  createdBy: string;
  title: string;
  content: string;
  image: string;
  category: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<IPost>(
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
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // implement default photo
      default:
        "https://www.shutterstock.com/image-photo/motorcycle-parked-alone-on-asphalt-260nw-2153911847.jpg",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
