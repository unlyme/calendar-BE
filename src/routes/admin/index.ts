import { Router } from "express";
import { adminAuthRoutes } from "./auth";
import { adminUserRoutes } from "./user";
import { adminStaffRoutes } from "./staff";

export const adminRoutes = () => {
  const router = Router();

  router.use('/auth', adminAuthRoutes())
  router.use('/users', adminUserRoutes())
  router.use('/staffs', adminStaffRoutes())

  return router;
}
