import { Router } from "express";
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireAdmin } from "../../middleware/requireAdmin";
import { AdminProjectController } from "../../controller/admin/project.controller";

export const adminProjectRoutes = () => {
  const router = Router();
  const projectController = new AdminProjectController();

  /**
   * @swagger
   * tags:
   *   name: AdminProject
   *   description: The Admin Project API
   * /admin/projects:
   *   get:
   *     summary: Fetch Project list
   *     tags: [AdminProject]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: Project list.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Project'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *
   *   post:
   *     summary: Create new Project
   *     tags: [AdminProject]
   *     security:
   *      - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateProjectInput'
   *     responses:
   *       200:
   *         description: The created Project.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Project'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *
   *   put:
   *     summary: Update Project
   *     tags: [AdminProject]
   *     security:
   *      - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateProjectInput'
   *     responses:
   *       200:
   *         description: The updated Project.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Project'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *
   *   delete:
   *     summary: Delete Project
   *     tags: [AdminProject]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of Project
   *        required: true
   *     responses:
   *       200:
   *         description: Deleting Project status.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/DeleteProjectResponse'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */

  router.get('/', deserializeUser, requireAdmin, projectController.index);
  router.post('/', deserializeUser, requireAdmin, projectController.create);
  router.put('/:id', deserializeUser, requireAdmin, projectController.update);
  router.delete('/:id', deserializeUser, requireAdmin, projectController.delete);

  return router;
}
