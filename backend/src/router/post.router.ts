import { Router } from "express";

const postRouter = (router: Router) => {
  router.post("/auth/create", register);
};

export default postRouter;
