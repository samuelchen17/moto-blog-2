import { Router } from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getAllComments,
  getComments,
  likeComment,
} from "../controllers/comment.controller";
import {
  isAdmin,
  isAdminOrCommentOwner,
  isAuthenticated,
  isOwner,
} from "../middlewares/user.middlewares";

const commentRouter = (router: Router) => {
  router.post("/comment/postcomment", isAuthenticated, createComment);
  router.get("/comment/getcomments/:postId", getComments);

  router.patch(
    "/comment/like/:commentId/:userId",
    isAuthenticated,
    likeComment
  );
  router.get(
    "/comment/getallcomments/:id",
    isAuthenticated,
    isAdmin,
    getAllComments
  );

  // edit comment
  router.patch(
    "/comment/edit/:commentId/:id/:commentBy",
    isAuthenticated,
    isAdminOrCommentOwner,
    editComment
  );
  router.delete(
    "/comment/delete/:commentId/:id/:commentBy",
    isAuthenticated,
    isAdminOrCommentOwner,
    deleteComment
  );
};

export default commentRouter;
