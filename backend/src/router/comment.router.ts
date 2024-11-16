import { Router } from "express";
import { createComment, getComments } from "../controllers/comment.controller";
import { isAuthenticated } from "../middlewares/user.middlewares";

const commentRouter = (router: Router) => {
  router.post("/comment/postcomment", isAuthenticated, createComment);
  router.get("/comment/getcomments", getComments);
};

export default commentRouter;
