import { Router } from "express";
import { adminAuthRoutes } from "./auth";
import { adminUserRoutes } from "./user";
import { adminStaffRoutes } from "./staff";
import { adminProjectRoutes } from "./project";
import { adminStatisticsRoutes } from "./statistics";
import { adminServiceRoutes } from "./service";
import { adminProjectUserRoutes } from "./projectUser";
import { adminRequestAccessRoutes } from "./requestAccess";
import { adminAccessCodeRoutes } from "./accessCode";
import { adminHostingRoutes } from "./hosting";
import { adminAlphaHostingRoutes } from "./alphaHosting";

export const adminRoutes = () => {
  const router = Router();

  router.use('/auth', adminAuthRoutes())
  router.use('/users', adminUserRoutes())
  router.use('/staffs', adminStaffRoutes())
  router.use('/projects', adminProjectRoutes())
  router.use('/statistics', adminStatisticsRoutes())
  router.use('/services', adminServiceRoutes())
  router.use('/projectUsers', adminProjectUserRoutes())
  router.use('/requestAccesses', adminRequestAccessRoutes())
  router.use('/accessCodes', adminAccessCodeRoutes())
  router.use('/hosting', adminHostingRoutes());
  router.use('/alpha-hosting', adminAlphaHostingRoutes());

  return router;
}
