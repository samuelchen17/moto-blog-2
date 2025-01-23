import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";

export const contactUs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json("Message sent successfully");
  } catch (err) {
    console.error("Error sending message:", err);
    next(new CustomError(500, "Failed to send message"));
  }
};
