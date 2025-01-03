import { Router } from "express";
import {
  getEvents,
  deleteEvent,
  editEvent,
  createEvent,
  getEvent,
} from "../controllers/events.controller";
import { isAdmin, isAuthenticated } from "../middlewares/user.middlewares";

const eventRouter = (router: Router) => {
  router.get("/event/get-events", getEvents);
  router.get("/event/get-event/:eventId", getEvent);
  router.post("/event/create-event/:id", isAuthenticated, isAdmin, createEvent);
  router.patch(
    "/event/edit-event/:eventId/:id",
    isAuthenticated,
    isAdmin,
    editEvent
  );
  router.delete(
    "/event/delete-event/:eventId/:id",
    isAuthenticated,
    isAdmin,
    deleteEvent
  );
};

export default eventRouter;
