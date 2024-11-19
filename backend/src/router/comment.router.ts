import { Router } from "express";
import {
  createComment,
  getComments,
  likeComment,
} from "../controllers/comment.controller";
import { isAuthenticated, isOwner } from "../middlewares/user.middlewares";

const commentRouter = (router: Router) => {
  router.post("/comment/postcomment", isAuthenticated, createComment);
  router.get("/comment/getcomments/:postId", getComments);
  router.patch("/comment/like/:commentId", isAuthenticated, likeComment);
  // implement
  // router.delete(
  //   "/comment/deleteComment",
  //   isAuthenticated,
  //   isOwner,
  //   deleteComment
  // );
};

export default commentRouter;
