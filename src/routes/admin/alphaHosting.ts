import { Router } from "express";
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireAdmin } from "../../middleware/requireAdmin";
import { AdminAlphaHostingController } from "../../controller/admin/alphaHosting.controller";

export const adminAlphaHostingRoutes = () => {
  const router = Router();
  const adminHostingController = new AdminAlphaHostingController();

  router.post(
    "/accounts",
    deserializeUser,
    requireAdmin,
    adminHostingController.createAccount
  )

  router.get(
    "/accounts",
    deserializeUser,
    requireAdmin,
    adminHostingController.listAccount
  )

  router.patch(
    "/accounts/suspend",
    deserializeUser,
    requireAdmin,
    adminHostingController.suspendAccount
  )

  router.patch(
    "/accounts/unsuspend",
    deserializeUser,
    requireAdmin,
    adminHostingController.unsuspendAccount
  )

  router.delete(
    "/accounts",
    deserializeUser,
    requireAdmin,
    adminHostingController.deleteAccount
  )

  router.post(
    "/accounts/user-session",
    deserializeUser,
    requireAdmin,
    adminHostingController.createUserSession
  )

  router.patch(
    "/accounts/assign-to-project",
    deserializeUser,
    requireAdmin,
    adminHostingController.assignToProject
  )

  router.get(
    "/accounts/internal-hosting-records",
    deserializeUser,
    requireAdmin,
    adminHostingController.getHostingRecords
  )

  router.get(
    "/plans",
    deserializeUser,
    requireAdmin,
    adminHostingController.getPlans
  )

  router.get(
    "/accounts/user-services",
    deserializeUser,
    requireAdmin,
    adminHostingController.getUserServices
  )

  return router;
}
