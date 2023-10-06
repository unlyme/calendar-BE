import {Router} from "express";
import {validate} from "../../middleware/validate";
import { loginAdminSchema } from "../../schemas/staff.schema";
import { AdminAuthController } from "../../controller/admin/auth.controller";
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireAdmin } from "../../middleware/requireAdmin";

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
   *
   * /admin/auth/logout:
   *   get:
   *     summary: Logout admin
   *     tags: [AdminAuth]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: The access token has been successfully invalidated.
   *       401:
   *         description: The admin is not authenticated.
   *       500:
   *         description: An error occurred while invalidating the access token.
   *
   * /admin/auth/refresh:
   *   get:
   *     summary: Get refresh token admin
   *     tags: [AdminAuth]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: Get refresh token.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/LoginAdminResponse'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */
  router.post('/login', validate(loginAdminSchema), authController.login);
  router.get('/logout', deserializeUser, requireAdmin, authController.logout);
  router.get('/refresh', deserializeUser, requireAdmin, authController.refresh);
  return router;
}
