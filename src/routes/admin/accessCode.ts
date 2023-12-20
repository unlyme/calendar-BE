import { Router } from "express";
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireAdmin } from "../../middleware/requireAdmin";
import { AdminAccessCodeController } from "../../controller/admin/accessCode.controller";

export const adminAccessCodeRoutes = () => {
  const router = Router();
  const adminAccessCodeController = new AdminAccessCodeController();

  router.get(
    "/",
    deserializeUser,
    requireAdmin,
    adminAccessCodeController.index
  );

  router.post(
    "/",
    deserializeUser,
    requireAdmin,
    adminAccessCodeController.create
  );

  return router;
};
