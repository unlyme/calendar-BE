import {Router} from "express";
import { HostingController } from "../controller/hosting.controller";
import {deserializeUser} from "../middleware/deserializeUser";

export const hostingRoutes = () => {
  const router = Router();
  const hostingController = new HostingController();

  router.post('/user-session', deserializeUser, hostingController.createUserSession);

  return router;
}
