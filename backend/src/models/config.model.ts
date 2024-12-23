import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  hot_articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  updated_at: { type: Date, default: Date.now },
});

export const Config = mongoose.model("Config", configSchema);
