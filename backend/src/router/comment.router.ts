import { Router } from "express";
import { createComment } from "../controllers/comment.controller";
import { isAuthenticated } from "../middlewares/user.middlewares";

const commentRouter = (router: Router) => {
  router.post("/comment/postcomment", isAuthenticated, createComment);
};

export default commentRouter;
