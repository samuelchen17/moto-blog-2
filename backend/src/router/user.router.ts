import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  signOut,
  updateUser,
} from "../controllers/user.controller";
import {
  isAdmin,
  isAuthenticated,
  isOwner,
} from "../middlewares/user.middlewares";

const userRouter = (router: Router) => {
  router.get("/user/:id", isAuthenticated, isAdmin, getAllUsers);
  router.delete("/user/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/user/:id", isAuthenticated, isOwner, updateUser);
  router.post("/user", signOut);
};

export default userRouter;
