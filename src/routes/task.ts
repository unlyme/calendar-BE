import { Router } from "express";
import { TaskController } from "../controller/task.controller";
import { deserializeUser } from "../middleware/deserializeUser";

export const tasksRoutes = () => {
  const router = Router();
  const taskController = new TaskController();
  /**
   * @swagger
   * tags:
   *   name: Task
   *   description: The Task API
   * /tasks:
   *   get:
   *     summary: Fetch task list
   *     tags: [Task]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: Task list.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Task'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   * /tasks/{taskId}:
   *   put:
   *     summary: Update task
   *     tags: [Task]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *      - name: taskId
   *        in: path
   *        description: The id of task
   *        required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpsertTaskInput'
   *     responses:
   *       200:
   *         description: The updated task.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Task'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */

  router.get("/", deserializeUser, taskController.index);
  router.put("/:id", deserializeUser, taskController.update);
  router.post("/", deserializeUser, taskController.create);

  return router;
};
