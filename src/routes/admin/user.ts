import {Router} from "express";
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireAdmin } from "../../middleware/requireAdmin";
import { AdminUserController } from "../../controller/admin/user.controller";

export const adminUserRoutes = () => {
  const router = Router();
  const adminUserController = new AdminUserController();

  /**
   * @swagger
   * tags:
   *   name: AdminUser
   *   description: The Admin User API
   * /admin/users:
   *   get:
   *     summary: Fetch User list
   *     tags: [AdminUser]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: User list.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/User'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */
  router.get('/', deserializeUser, requireAdmin, adminUserController.index);

  return router;
}
