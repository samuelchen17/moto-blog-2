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
  updatePost,
  getHotPosts,
  toggleSavePost,
  toggleLikePost,
} from "../controllers/post.controller";

const postRouter = (router: Router) => {
  // create post
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
  // update post
  router.patch(
    "/post/update/:postId/:id",
    isAuthenticated,
    isOwner,
    isAdmin,
    updatePost
  );
  router.get("/post/gethotposts", getHotPosts);

  // save and unsave post
  router.patch(
    "/post/save-post/:id/:postId",
    isAuthenticated,
    isOwner,
    toggleSavePost
  );

  // like and unlike post
  router.patch(
    "/post/like-post/:id/:postId",
    isAuthenticated,
    isOwner,
    toggleLikePost
  );
};

export default postRouter;
