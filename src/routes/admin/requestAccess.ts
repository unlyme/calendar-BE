import { Router } from "express";
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireAdmin } from "../../middleware/requireAdmin";
import { AdminRequestAccessController } from "../../controller/admin/requestAccess.controller";

export const adminRequestAccessRoutes = () => {
  const router = Router();
  const controller = new AdminRequestAccessController();

  router.get("/", deserializeUser, requireAdmin, controller.index);
  router.post("/:id/sendInvitation", deserializeUser, requireAdmin, controller.sendCodeToUser);

  return router;
};
