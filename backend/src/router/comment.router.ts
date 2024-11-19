import { Router } from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
  likeComment,
} from "../controllers/comment.controller";
import {
  isAdminOrOwner,
  isAuthenticated,
} from "../middlewares/user.middlewares";

const commentRouter = (router: Router) => {
  router.post("/comment/postcomment", isAuthenticated, createComment);
  router.get("/comment/getcomments/:postId", getComments);
  router.patch(
    "/comment/like/:commentId/:userId",
    isAuthenticated,
    likeComment
  );

  // edit comment
  router.patch(
    "/comment/edit/:commentId/:id",
    isAuthenticated,
    isAdminOrOwner,
    editComment
  );
  router.delete(
    "/comment/delete/:commentId/:id",
    isAuthenticated,
    isAdminOrOwner,
    deleteComment
  );
};

export default commentRouter;
