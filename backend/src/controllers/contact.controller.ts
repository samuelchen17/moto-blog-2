import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";
import { Contact } from "../models/contact.model";

export const handleContactForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      next(new CustomError(500, "Please fill out all fields"));
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(200).json({ message: "Your message has been sent" });
  } catch (err) {
    console.error("Error sending message:", err);
    next(new CustomError(500, "Failed to send message"));
  }
};
