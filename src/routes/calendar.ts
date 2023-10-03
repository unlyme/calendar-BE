import {Router} from "express";
import {CalendarController} from "../controller/calendar.controller";
import {deserializeUser} from "../middleware/deserializeUser";

export const calendarRoutes = () => {
  const router = Router();
  const calendarController = new CalendarController();
  /**
   * @swagger
   * tags:
   *   name: Calendar
   *   description: The calendar API
   * /calendars:
   *   get:
   *     summary: Fetch calendar list
   *     tags: [Calendar]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: Calendar list.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Calendar'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *   post:
   *     summary: Create new calendar
   *     tags: [Calendar]
   *     security:
   *      - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpsertCalendarInput'
   *     responses:
   *       200:
   *         description: The created calendar.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Calendar'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   * /calendars/{calendarId}:
   *   put:
   *     summary: Update calendar
   *     tags: [Calendar]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *      - name: calendarId
   *        in: path
   *        description: The id of calendar
   *        required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpsertCalendarInput'
   *     responses:
   *       200:
   *         description: The updated calendar.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Calendar'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *   delete:
   *     summary: Delete calendar
   *     tags: [Calendar]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *      - name: calendarId
   *        in: path
   *        description: The id of calendar
   *        required: true
   *     responses:
   *       200:
   *         description: Deleting calendar status.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/DeleteCalendarResponse'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */
  
  router.get('/', deserializeUser, calendarController.index);
  router.post('/', deserializeUser, calendarController.create);
  router.put('/:id', deserializeUser, calendarController.update);
  router.delete('/:id', deserializeUser, calendarController.delete);
  
  return router;
}
