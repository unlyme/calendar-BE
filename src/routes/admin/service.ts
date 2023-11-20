import {Router} from "express";
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireAdmin } from "../../middleware/requireAdmin";
import { AdminServiceController } from "../../controller/admin/services.controller";

export const adminServiceRoutes = () => {
  const router = Router();
  const adminServiceController = new AdminServiceController();

  /**
   * @swagger
   * tags:
   *   name: AdminService
   *   description: The Admin Service API
   * /admin/services:
   *   get:
   *     summary: Fetch Services
   *     tags: [AdminService]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: Admin Services.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Service'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   * /admin/services/{serviceId}/units:
   *   get:
   *     summary: Service units
   *     tags: [Calendar]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *      - name: serviceId
   *        in: path
   *        description: The id of service
   *        required: true
   *     responses:
   *       200:
   *         description: List service units.
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */
  router.get('/', deserializeUser, requireAdmin, adminServiceController.index);
  router.get('/:id/units', deserializeUser, requireAdmin, adminServiceController.getUnitServices);
  router.put('/units/:id', deserializeUser, requireAdmin, adminServiceController.update);
  router.delete('/units/:id', deserializeUser, requireAdmin, adminServiceController.delete);

  return router;
}
