import { Router } from "express";
import {
  getContactUsMessages,
  handleContactForm,
  toggleReadStatus,
} from "../controllers/contact.controller";
import { isAdmin, isAuthenticated } from "../middlewares/user.middlewares";

const authRouter = (router: Router) => {
  router.post("/contact-us", handleContactForm);
  router.get(
    "/contact/get-messages",
    isAuthenticated,
    isAdmin,
    getContactUsMessages
  );
  router.patch("/toggle-read-status", toggleReadStatus);
};

export default authRouter;
