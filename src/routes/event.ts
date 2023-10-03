import {Router} from "express";
import {EventController} from "../controller/event.controller";
import {deserializeUser} from "../middleware/deserializeUser";

export const eventRoutes = () => {
  const router = Router();
  const eventController = new EventController();
  /**
   * @swagger
   * tags:
   *   name: Event
   *   description: The event API
   * /events:
   *   get:
   *     summary: Fetch event list
   *     tags: [Event]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: Event list.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Event'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *   post:
   *     summary: Create new event
   *     tags: [Event]
   *     security:
   *      - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpsertEventInput'
   *     responses:
   *       200:
   *         description: The created event.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Event'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   * /events/{eventId}:
   *   put:
   *     summary: Update event
   *     tags: [Event]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *      - name: eventId
   *        in: path
   *        description: The id of event
   *        required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpsertEventInput'
   *     responses:
   *       200:
   *         description: The updated event.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Event'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *   delete:
   *     summary: Delete event
   *     tags: [Event]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *      - name: eventId
   *        in: path
   *        description: The id of event
   *        required: true
   *     responses:
   *       200:
   *         description: Deleting event status.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/DeleteEventResponse'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */
  
  router.get('/', deserializeUser, eventController.index);
  router.post('/', deserializeUser, eventController.create);
  router.put('/:id', deserializeUser, eventController.update);
  router.delete('/:id', deserializeUser, eventController.delete);
  
  return router;
}
