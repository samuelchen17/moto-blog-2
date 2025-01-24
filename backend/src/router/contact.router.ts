import { Router } from "express";
import {
  getContactFormMessages,
  handleContactForm,
} from "../controllers/contact.controller";

const authRouter = (router: Router) => {
  router.post("/contact-us", handleContactForm);
  router.get("/contact/get-messages", getContactFormMessages);
};

export default authRouter;
