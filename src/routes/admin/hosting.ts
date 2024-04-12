import { Router } from "express";
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireAdmin } from "../../middleware/requireAdmin";
import { AdminHostingController } from "../../controller/admin/hosting.controller";

export const adminHostingRoutes = () => {
  const router = Router();
  const adminHostingController = new AdminHostingController();

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
    "/accounts/unsuspend",
    deserializeUser,
    requireAdmin,
    adminHostingController.deleteAccount
  )

  return router;
}
