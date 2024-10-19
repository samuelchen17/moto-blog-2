import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const auth = (router: Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};

export default auth;
