import { Router } from "express";
import { createComment, getComments } from "../controllers/comment.controller";
import { isAuthenticated, isOwner } from "../middlewares/user.middlewares";

const commentRouter = (router: Router) => {
  router.post("/comment/postcomment", isAuthenticated, createComment);
  router.get("/comment/getcomments", getComments);
  // implement
  // router.delete(
  //   "/comment/deleteComment",
  //   isAuthenticated,
  //   isOwner,
  //   deleteComment
  // );
};

export default commentRouter;
