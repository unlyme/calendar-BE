import {Router} from "express";
import {deserializeUser} from "../middleware/deserializeUser";
import {UnitController} from "../controller/unit.controller";

export const unitRoutes = () => {
  const router = Router();
  const unitController = new UnitController();
  
  /**
   * @swagger
   * tags:
   *   name: Unit
   *   description: The unit API
   * /units:
   *   get:
   *     summary: Fetch unit list
   *     tags: [Unit]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: Unit list.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Unit'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */
  
  router.get('/', deserializeUser, unitController.index);
  
  return router;
}
