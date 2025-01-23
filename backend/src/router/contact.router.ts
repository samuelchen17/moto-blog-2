import { Router } from "express";
import { handleContactForm } from "../controllers/contact.controller";

const authRouter = (router: Router) => {
  router.post("/contact-us", handleContactForm);
};

export default authRouter;
