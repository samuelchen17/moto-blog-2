import { Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import postRouter from "./post.router";
import commentRouter from "./comment.router";
import eventRouter from "./events.router";

const router: Router = Router();

export default (): Router => {
  authRouter(router);
  userRouter(router);
  postRouter(router);
  commentRouter(router);
  eventRouter(router);
  return router;
};
