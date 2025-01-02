import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler.utils";

// implement get participants along with getAllEvents, for accordion

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (err) {
    console.error("Error deleting event:", err);
    next(new CustomError(500, "Failed to delete event"));
  }
};

export const editEvent = async (
  req: Request,
  res: Response,
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
  res: Response,
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
  res: Response,
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
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    console.error("Error joining event:", err);
    next(new CustomError(500, "Failed to join event"));
  }
};
