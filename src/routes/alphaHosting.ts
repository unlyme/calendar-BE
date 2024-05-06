import {Router} from "express";
import { AlphaHostingController } from "../controller/alphaHosting.controller";
import {deserializeUser} from "../middleware/deserializeUser";

export const alphaHostingRoutes = () => {
  const router = Router();
  const hostingController = new AlphaHostingController();

  router.post('/user-session', deserializeUser, hostingController.createUserSession);

  return router;
}
