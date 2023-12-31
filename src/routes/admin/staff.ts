import {Router} from "express";
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireAdmin } from "../../middleware/requireAdmin";
import { StaffController } from "../../controller/admin/staff.controlller";

export const adminStaffRoutes = () => {
  const router = Router();
  const staffController = new StaffController();

  /**
   * @swagger
   * tags:
   *   name: AdminStaff
   *   description: The Admin Staff API
   * /admin/staffs:
   *   get:
   *     summary: Fetch Staff list
   *     tags: [AdminStaff]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: Staff list.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Staff'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *
   *   post:
   *     summary: Create new staff
   *     tags: [AdminStaff]
   *     security:
   *      - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateStaffInput'
   *     responses:
   *       200:
   *         description: The created staff.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Staff'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *
   * /admin/staffs/{staffId}:
   *   put:
   *     summary: Update staff
   *     tags: [AdminStaff]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *       - name: staffId
   *         in: path
   *         description: The id of staff
   *         required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpdateStaffInput'
   *     responses:
   *       200:
   *         description: The updated staff.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Staff'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *
   *   delete:
   *     summary: Delete Staff
   *     tags: [AdminStaff]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *      - name: staffId
   *        in: path
   *        description: The id of staff
   *        required: true
   *     responses:
   *       200:
   *         description: Deleting staff status.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/DeleteStaffResponse'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */
  router.get('/', deserializeUser, requireAdmin, staffController.index);
  router.post('/', deserializeUser, requireAdmin, staffController.create);
  router.put('/:id', deserializeUser, requireAdmin, staffController.update);
  router.delete('/:id', deserializeUser, requireAdmin, staffController.delete);
  router.put('/:id/changePassword', deserializeUser, requireAdmin, staffController.changePassword);

  return router;
}
