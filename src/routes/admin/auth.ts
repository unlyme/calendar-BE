import {Router} from "express";
import {validate} from "../../middleware/validate";
import { loginUserSchema } from "../../schemas/user.schema";
import { AdminAuthController } from "../../controller/admin/auth.controller";

export const adminAuthRoutes = () => {
  const router = Router();
  const authController = new AdminAuthController();

  /**
   * @swagger
   * tags:
   *   name: AdminAuth
   *   description: The AdminAuth API
   * /admin/auth/login:
   *   post:
   *     summary: Login Admin
   *     tags: [AdminAuth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/LoginAdminInput'
   *     responses:
   *       200:
   *         description: Logged Admin info.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/LoginAdminResponse'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */
  router.post('/login', validate(loginUserSchema), authController.login);
  return router;
}
