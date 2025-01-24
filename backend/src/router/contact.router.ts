import { Router } from "express";
import {
  getContactUsMessages,
  handleContactForm,
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
};

export default authRouter;
