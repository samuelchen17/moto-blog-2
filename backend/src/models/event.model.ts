import mongoose from "mongoose";
import { IEvent } from "src/types";

const eventSchema = new mongoose.Schema<IEvent>(
  {
    createdBy: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "motoce event",
    },
    description: {
      type: String,
      required: true,
    },
    participants: {
      type: [String],
      default: [],
    },
    capacity: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
