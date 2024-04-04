import {Router} from "express";
import {deserializeUser} from "../middleware/deserializeUser";
import { NotificationController } from "../controller/notification.controller";

export const notificationRoutes = () => {
  const router = Router();
  const notificationController = new NotificationController();

  router.get('/', deserializeUser, notificationController.listByUser);

  return router;
}
