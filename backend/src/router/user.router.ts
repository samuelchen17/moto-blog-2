import { Router } from "express";
import {
  deleteUser,
  deleteUserAdmin,
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

  // delete own account
  router.delete("/user/:id", isAuthenticated, isOwner, deleteUser);

  // admin delete route
  router.delete(
    "/user/admin/:id/:deleteId",
    isAuthenticated,
    isOwner,
    isAdmin,
    deleteUserAdmin
  );

  // update user info
  router.patch("/user/:id", isAuthenticated, isOwner, updateUser);
  router.post("/user", signOut);

  // get user info by id
  router.get("/:commentBy", getUser);
};

export default userRouter;
