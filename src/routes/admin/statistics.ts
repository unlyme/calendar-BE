import {Router} from "express";
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireAdmin } from "../../middleware/requireAdmin";
import { AdminStatisticsController } from "../../controller/admin/statistics.controller";

export const adminStatisticsRoutes = () => {
  const router = Router();
  const adminStatisticsController = new AdminStatisticsController();

  /**
   * @swagger
   * tags:
   *   name: AdminStatistics
   *   description: The Admin User API
   * /admin/statistics:
   *   get:
   *     summary: Fetch Statistics
   *     tags: [AdminStatistics]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: Admin Statistics.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 usersCount:
   *                   type: number
   *                 newUsersCount:
   *                   type: number
   *                 projectsCount:
   *                   type: number
   *                 newProjectsCount:
   *                   type: number
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */
  router.get('/', deserializeUser, requireAdmin, adminStatisticsController.index);

  return router;
}
