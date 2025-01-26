import { Router } from "express";
import {
  deleteContactUsMessage,
  getContactUsMessages,
  getMessageNotificationCount,
  handleContactForm,
  toggleReadStatus,
} from "../controllers/contact.controller";
import { isAdmin, isAuthenticated } from "../middlewares/user.middlewares";

const authRouter = (router: Router) => {
  router.post("/contact-us", handleContactForm);
  // get all messages
  router.get(
    "/contact/get-messages/:id",
    isAuthenticated,
    isAdmin,
    getContactUsMessages
  );
  // toggle read status
  router.patch(
    "/contact/toggle-read-status/:id/:messageId",
    isAuthenticated,
    isAdmin,
    toggleReadStatus
  );
  // delete message
  router.delete(
    "/contact/delete-message/:id/:messageId",
    isAuthenticated,
    isAdmin,
    deleteContactUsMessage
  );

  // get number of unread messages
  router.get(
    "/contact/notifications/:id",
    isAuthenticated,
    isAdmin,
    getMessageNotificationCount
  );
};

export default authRouter;
