import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.controllers";
import { isAuthenticated, isOwner } from "../middlewares/user.middlewares";

const usersRouter = (router: Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
};

export default usersRouter;
