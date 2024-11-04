import { Router } from "express";
import { googleAuth, login, register } from "../controllers/auth.controller";

const authRouter = (router: Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/google", googleAuth);
};

export default authRouter;
