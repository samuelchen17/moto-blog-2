import { Router } from "express";
import auth from "./auth.router";
import userRouter from "./user.router";

const router: Router = Router();

export default (): Router => {
  auth(router);
  userRouter(router);

  return router;
};
