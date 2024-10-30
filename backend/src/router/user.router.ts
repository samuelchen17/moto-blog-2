import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.controllers";
import { isAuthenticated, isOwner } from "../middlewares/user.middlewares";

const userRouter = (router: Router) => {
  router.get("/user", isAuthenticated, getAllUsers);
  router.delete("/user/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/user/:id", isAuthenticated, isOwner, updateUser);
};

export default userRouter;
