import { Router } from "express";
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireAdmin } from "../../middleware/requireAdmin";
import { AdminProjectController } from "../../controller/admin/project.controller";

export const adminStaffRoutes = () => {
  const router = Router();
  const projectController = new AdminProjectController();

  router.get('/', deserializeUser, requireAdmin, projectController.index);

  return router;
}
