import { Router } from "express";
import { adminAuthRoutes } from "./auth";
import { adminUserRoutes } from "./user";

export const adminRoutes = () => {
  const router = Router();

  router.use('/auth', adminAuthRoutes())
  router.use('/users', adminUserRoutes())

  return router;
}
