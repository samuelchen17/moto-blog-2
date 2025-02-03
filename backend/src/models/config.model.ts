import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  hot_articles: {
    type: Map,
    of: mongoose.Schema.Types.ObjectId,
    default: {
      1: null,
      2: null,
      3: null,
      4: null,
    },
  },
  updated_at: { type: Date, default: Date.now },
});

export const Config = mongoose.model("Config", configSchema);
