import { Router } from "express";
import { adminAuthRoutes } from "./auth";
import { adminUserRoutes } from "./user";
import { adminStaffRoutes } from "./staff";
import { adminProjectRoutes } from "./project";
import { adminStatisticsRoutes } from "./statistics";
import { adminServiceRoutes } from "./service";
import { adminProjectUserRoutes } from "./projectUser";

export const adminRoutes = () => {
  const router = Router();

  router.use('/auth', adminAuthRoutes())
  router.use('/users', adminUserRoutes())
  router.use('/staffs', adminStaffRoutes())
  router.use('/projects', adminProjectRoutes())
  router.use('/statistics', adminStatisticsRoutes())
  router.use('/services', adminServiceRoutes())
  router.use('/projectUsers', adminProjectUserRoutes())

  return router;
}
