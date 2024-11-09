import { Router } from "express";
import {
  isAuthenticated,
  isOwner,
  isAdmin,
} from "../middlewares/user.middlewares";
import {
  createPost,
  getPosts,
  deletePost,
} from "../controllers/post.controller";

const postRouter = (router: Router) => {
  router.post(
    "/post/create/:id",
    isAuthenticated,
    isOwner,
    isAdmin,
    createPost
  );
  router.get("/post/getposts", getPosts);
  router.delete(
    "/post/delete/:postId/:id",
    isAuthenticated,
    isOwner,
    isAdmin,
    deletePost
  );
};

export default postRouter;
