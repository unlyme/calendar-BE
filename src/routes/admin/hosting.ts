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
    adminHostingController.create
  )

  return router;
}
