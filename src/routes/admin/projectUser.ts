import { Router } from "express";
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireAdmin } from "../../middleware/requireAdmin";
import { AdminProjectUserController } from "../../controller/admin/projectUser.controller";

export const adminProjectUserRoutes = () => {
  const router = Router();
  const adminProjectUserController = new AdminProjectUserController();

  router.put(
    "/:id",
    deserializeUser,
    requireAdmin,
    adminProjectUserController.update
  );

  router.delete(
    "/:id",
    deserializeUser,
    requireAdmin,
    adminProjectUserController.delete
  );

  return router;
};
