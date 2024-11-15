import { Router } from "express";
import { createComment } from "../controllers/comment.controller";

const commentRouter = (router: Router) => {
  router.post("/comment/create", createComment);
};

export default commentRouter;
