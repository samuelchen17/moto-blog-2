import mongoose from "mongoose";
import { IContactForm } from "src/types";

const contactSchema = new mongoose.Schema<IContactForm>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
