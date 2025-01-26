import { Router } from "express";
import {
  getContactUsMessages,
  handleContactForm,
  toggleReadStatus,
} from "../controllers/contact.controller";
import { isAdmin, isAuthenticated } from "../middlewares/user.middlewares";

const authRouter = (router: Router) => {
  router.post("/contact-us", handleContactForm);
  // get all messages
  router.get(
    "/contact/get-messages/:id",
    isAuthenticated,
    isAdmin,
    getContactUsMessages
  );
  // toggle read status
  router.patch(
    "/contact/toggle-read-status/:id/:messageId",
    isAuthenticated,
    isAdmin,
    toggleReadStatus
  );
};

export default authRouter;
