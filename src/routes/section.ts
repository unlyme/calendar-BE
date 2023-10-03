import {Router} from "express";
import {deserializeUser} from "../middleware/deserializeUser";
import {SectionController} from "../controller/section.controller";

export const sectionRoutes = () => {
  const router = Router();
  const sectionController = new SectionController();
  
  /**
   * @swagger
   * tags:
   *   name: Section
   *   description: The section API
   * /sections:
   *   get:
   *     summary: Fetch section list
   *     tags: [Section]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: Section list.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Section'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */
  router.get('/', deserializeUser, sectionController.index);
  
  return router;
}
