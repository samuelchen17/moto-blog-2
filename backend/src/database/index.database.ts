import mongoose from "mongoose";
import { CustomError } from "../utils/errorHandler.utils";
import config from "../config/config";

const connectDB = async () => {
  try {
    if (!config.mongo.url) {
      throw new CustomError(500, "DB URL is not configured");
    }

    await mongoose.connect(config.mongo.url, config.mongo.options);
    console.log("DB is connected");
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError(500, `Database connection error: ${error.message}`);
    } else {
      throw new CustomError(
        500,
        "Unknown error occurred while connecting to the database"
      );
    }
  }
};

export default connectDB;
