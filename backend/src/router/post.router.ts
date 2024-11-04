import { Router } from "express";
import {
  isAuthenticated,
  isOwner,
  isAdmin,
} from "../middlewares/user.middlewares";
import { createPost } from "../controllers/post.controller";

const postRouter = (router: Router) => {
  router.post("/posts/create", isAuthenticated, isOwner, isAdmin, createPost);
};

export default postRouter;
