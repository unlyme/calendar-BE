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
   *
   *   post:
   *     summary: Update user
   *     tags: [AdminUser]
   *     security:
   *      - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *       200:
   *         description: The created User.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/User'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *
   * /admin/users/{userId}:
   *   put:
   *     summary: Update User
   *     tags: [AdminUser]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *       - name: userId
   *         in: path
   *         description: The id of user
   *         required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateUserInput'
   *     responses:
   *       200:
   *         description: The updated user.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/User'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *
   *   delete:
   *     summary: Delete User
   *     tags: [AdminUser]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *      - name: userId
   *        in: path
   *        description: The id of user
   *        required: true
   *     responses:
   *       200:
   *         description: Deleting staff user.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/DeleteStaffResponse'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *
   * /admin/users/{userId}/projects:
   *   get:
   *     summary: Fetch User Projects list
   *     tags: [AdminUser]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *       - name: userId
   *         in: path
   *         description: The id of User
   *         required: true
   *     responses:
   *       200:
   *         description: User Projects list.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Project'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */
  router.get('/', deserializeUser, requireAdmin, adminUserController.index);
  router.post('/', deserializeUser, requireAdmin, adminUserController.create);
  router.put('/:id', deserializeUser, requireAdmin, adminUserController.update);
  router.delete('/:id', deserializeUser, requireAdmin, adminUserController.delete);
  router.get('/:id/projects', deserializeUser, requireAdmin, adminUserController.getProjects);

  return router;
}
