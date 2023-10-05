import { Router } from "express";
import { adminAuthRoutes } from "./auth";

export const adminRoutes = () => {
  const router = Router();

  router.use('/auth', adminAuthRoutes())

  return router;
}
