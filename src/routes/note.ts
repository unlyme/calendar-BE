import {Router} from "express";
import { NoteController } from "../controller/note.controller";
import { deserializeUser } from "../middleware/deserializeUser";

export const noteRoutes = () => {
  const router = Router();
  const noteController = new NoteController();
  /**
   * @swagger
   * tags:
   *   name: Note
   *   description: The note API
   * /notes:
   *   get:
   *     summary: Fetch note list
   *     tags: [Note]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: Note list.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Note'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *   post:
   *     summary: Create new note
   *     tags: [Note]
   *     security:
   *      - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpsertNoteInput'
   *     responses:
   *       200:
   *         description: The created note.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Note'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   * /notes/{noteId}:
   *   put:
   *     summary: Update note
   *     tags: [Note]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *      - name: noteId
   *        in: path
   *        description: The id of note
   *        required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/UpsertNoteInput'
   *     responses:
   *       200:
   *         description: The updated note.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/Note'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *   delete:
   *     summary: Delete note
   *     tags: [Note]
   *     security:
   *      - BearerAuth: []
   *     parameters:
   *      - name: noteId
   *        in: path
   *        description: The id of note
   *        required: true
   *     responses:
   *       200:
   *         description: Deleting note status.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/DeleteNoteResponse'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */

  router.get('/', deserializeUser, noteController.index);
  router.post('/', deserializeUser, noteController.create);
  router.put('/:id', deserializeUser, noteController.update);
  router.delete('/:id', deserializeUser, noteController.delete);

  return router;
}
