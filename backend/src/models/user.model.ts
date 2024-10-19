import mongoose from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
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

export const User = mongoose.model("User", userSchema);
