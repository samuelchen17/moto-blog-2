import { Router } from "express";
import { contactUs } from "src/controllers/contact.controller";

const authRouter = (router: Router) => {
  router.post("/contact-us", contactUs);
};

export default authRouter;
