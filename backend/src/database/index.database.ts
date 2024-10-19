import mongoose from "mongoose";
import dotenv from "dotenv";
import { CustomError } from "../utils/errorHandler.utils";

dotenv.config(); // load env variables

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new CustomError(500, "DB URL is not configured");
    }

    await mongoose.connect(process.env.MONGODB_URL);
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

// mongoose.Promise = Promise; // outdated with new mongoose
// mongoose.connect(process.env.MONGODB_URL);
// mongoose.connection.on("error", (error: Error) => console.log(error));
