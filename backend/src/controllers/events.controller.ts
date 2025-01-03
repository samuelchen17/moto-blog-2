import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";
import { IEvent, IEventRequest } from "src/types";
import { Event } from "../models/event.model";

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
      !participants ||
      !capacity
    ) {
      return next(new CustomError(400, "All fields are required"));
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

    res.status(200).json("Event has been deleted");
  } catch (err) {
    console.error("Error deleting event:", err);
    next(new CustomError(500, "Failed to delete event"));
  }
};

export const editEvent = async (
  req: Request<{}, {}, IEventRequest>,
  res: Response<IEvent>,
  next: NextFunction
) => {
  try {
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
  res: Response<IEvent[]>,
  next: NextFunction
) => {
  try {
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
