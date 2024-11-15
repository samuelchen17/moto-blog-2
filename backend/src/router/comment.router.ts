import { Router } from "express";

const commentRouter = (router: Router) => {
  router.post("/auth/register", register);
};

export default commentRouter;
