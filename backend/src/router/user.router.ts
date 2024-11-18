import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
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
  router.delete("/user/:id/:deleteId", isAuthenticated, isOwner, deleteUser);
  router.delete(
    "/user/admin/:id/:deleteId",
    isAuthenticated,
    isAdmin,
    deleteUser
  );
  router.patch("/user/:id", isAuthenticated, isOwner, updateUser);
  router.post("/user", signOut);
  router.get("/:id", getUser);
};

export default userRouter;
