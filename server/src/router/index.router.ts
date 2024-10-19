import { Router } from "express";
import auth from "./auth.router";
import usersRouter from "./users.router";

const router: Router = Router();

export default (): Router => {
  auth(router);
  usersRouter(router);

  return router;
};
