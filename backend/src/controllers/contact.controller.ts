import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";
import { Contact } from "../models/contact.model";
import {
  validateEmail,
  getEmailValidationErrMsg,
} from "../helpers/validator.helpers";
import { IContactForm, IContactResponse, INotificationsCount } from "src/types";
import { SortOrder } from "mongoose";

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

    if (!validateEmail(email)) {
      return next(new CustomError(400, getEmailValidationErrMsg()));
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(200).json({ message: "Your message has been sent" });
  } catch (err) {
    console.error("Error sending message:", err);
    next(new CustomError(500, "Failed to send message"));
  }
};

// const [unreadMessages, readMessages] = await Promise.all([
//   Contact.find({ read: false }),
//   Contact.find({ read: true })
//     .sort({ createdAt: sortDirection })
//     .skip(startIndex)
//     .limit(limit),
// ]);

// const messages = {
//   unread: unreadMessages,
//   read: readMessages,
// };

export const getContactUsMessages = async (
  req: Request,
  res: Response<IContactForm[]>,
  next: NextFunction
) => {
  try {
    const startIndex = parseInt(req.query.startIndex as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;

    // default sorting
    let sortField = "createdAt";
    let sortOrder: SortOrder = -1;

    // using set instead of arrays for faster lookups O(1)
    const validFields = new Set(["createdAt", "email", "read"]);

    if (req.query.sort && req.query.order) {
      sortField = req.query.sort as string;

      // injection attack check
      if (!validFields.has(sortField)) {
        return next(new CustomError(400, "Invalid sorting field"));
      }
      sortOrder = req.query.order === "asc" ? 1 : -1;
    }

    const sortOptions: Record<string, SortOrder> = {
      [sortField]: sortOrder,
    };

    const messages = await Contact.find()
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limit);

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error retrieving messages:", err);
    next(new CustomError(500, "Failed to retrieve messages"));
  }
};

export const toggleReadStatus = async (
  req: Request,
  res: Response<IContactResponse>,
  next: NextFunction
) => {
  try {
    const message = await Contact.findById(req.params.messageId);

    if (!message) {
      return next(new CustomError(404, "Message not found"));
    }

    message.read = !message.read;
    await message.save();

    res.status(200).json({
      message: message.read
        ? "Message marked as read"
        : "Message marked as unread",
      data: message,
    });
  } catch (err) {
    console.error("Error trying to toggle read status:", err);
    next(new CustomError(500, "Failed to toggle read status"));
  }
};

export const deleteContactUsMessage = async (
  req: Request,
  res: Response<IContactResponse>,
  next: NextFunction
) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.messageId);

    if (!message) {
      return next(new CustomError(404, "Message not found"));
    }

    res.status(200).json({
      message: "Message deleted successfully",
      data: message,
    });
  } catch (err) {
    console.error("Error deleting message:", err);
    next(new CustomError(500, "Failed to delete message"));
  }
};

export const getMessageNotificationCount = async (
  req: Request,
  res: Response<INotificationsCount>,
  next: NextFunction
) => {
  try {
    const notificationsCount = await Contact.countDocuments({ read: false });

    res.status(200).json({ notificationsCount });
  } catch (err) {
    console.error("Error getting message notifications:", err);
    next(new CustomError(500, "Failed to get message notifications"));
  }
};

// a controller to mark multiple messages as read or unread?, mark multiple for delete?
