import { Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";

const router: Router = Router();

export default (): Router => {
  authRouter(router);
  userRouter(router);

  return router;
};
