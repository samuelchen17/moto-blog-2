import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";
import { IEvent, IEventRequest, IEventResponse } from "src/types";
import { Event } from "../models/event.model";
import { SortOrder } from "mongoose";

// implement get participants along with getAllEvents, for accordion

export const createEvent = async (
  req: Request<{}, {}, IEventRequest>,
  res: Response<IEvent>,
  next: NextFunction
) => {
  try {
    // get request body
    const {
      createdBy,
      date,
      title,
      location,
      category,
      description,
      participants,
      capacity,
    } = req.body;

    if (
      !createdBy ||
      !date ||
      !title ||
      !location ||
      !category ||
      !description ||
      !participants
    ) {
      return next(new CustomError(400, "All fields are required"));
    }
    if (isNaN(capacity) || capacity <= 0) {
      return next(
        new CustomError(400, "Capacity must be a valid number greater than 0")
      );
    }

    const newEvent = new Event({
      createdBy,
      date,
      title,
      location,
      category,
      description,
      participants,
      capacity,
    });

    const savedEvent = await newEvent.save();

    res.status(200).json(savedEvent);
  } catch (err) {
    console.error("Error creating event:", err);
    next(new CustomError(500, "Failed to create event"));
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get eventId param, findById and delete
    const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);

    if (!deletedEvent) {
      return next(new CustomError(404, "Event not found"));
    }

    res.status(200).json({ message: "Event has been deleted" });
  } catch (err) {
    console.error("Error deleting event:", err);
    next(new CustomError(500, "Failed to delete event"));
  }
};

export const editEvent = async (
  req: Request,
  //   req: Request<{}, {}, IEventRequest>,
  res: Response<IEvent>,
  next: NextFunction
) => {
  try {
    const { eventId } = req.params;
    const updateFields = req.body;

    if (!updateFields || Object.keys(updateFields).length === 0) {
      return next(new CustomError(400, "No fields provided for update"));
    }

    const editedEvent = await Event.findByIdAndUpdate(eventId, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!editedEvent) {
      return next(new CustomError(404, "Event not found"));
    }

    res.status(200).json(editedEvent);
  } catch (err) {
    console.error("Error updating event:", err);
    next(new CustomError(500, "Failed to update event"));
  }
};

export const getEvent = async (
  req: Request,
  res: Response<IEvent>,
  next: NextFunction
) => {
  try {
  } catch (err) {
    console.error("Error retrieving event:", err);
    next(new CustomError(500, "Failed to retrieve event"));
  }
};

export const getEvents = async (
  req: Request,
  res: Response<IEventResponse>,
  next: NextFunction
) => {
  const startIndex = parseInt(req.query.startIndex as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;

  // default sorting
  let sortField = "createdAt";
  let sortOrder: SortOrder = -1;

  const validFields = new Set(["createdAt", "title", "category", "date"]);

  try {
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

    const events = await Event.find()
      .skip(startIndex)
      .limit(limit)
      .sort(sortOptions)
      .lean();

    const totalEvents = await Event.countDocuments();

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const currentEvents = await Event.find({
      date: { $gte: today },
    }).sort({ date: 1 });

    // Past events: before today
    const pastEvents = await Event.find({
      date: { $lt: today },
    }).sort({ date: -1 });

    const lastMonthEvents = await Event.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    const activeEvents = await Event.countDocuments({
      date: { $gte: now },
    });

    res.status(200).json({
      events,
      currentEvents,
      pastEvents,
      totalEvents,
      lastMonthEvents,
      activeEvents,
    });
  } catch (err) {
    console.error("Error retrieving events:", err);
    next(new CustomError(500, "Failed to retrieve events"));
  }
};

export const joinEvent = async (
  req: Request,
  res: Response<IEvent>,
  next: NextFunction
) => {
  try {
  } catch (err) {
    console.error("Error joining event:", err);
    next(new CustomError(500, "Failed to join event"));
  }
};
