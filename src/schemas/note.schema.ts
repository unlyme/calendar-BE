/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *  schemas:
 *    Note:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        text:
 *          type: string
 *    UpsertNoteInput:
 *      type: object
 *      required:
 *        - text
 *      properties:
 *        text:
 *          type: string
 *    DeleteNoteResponse:
 *      type: object
 *      required:
 *        - success
 *      properties:
 *        success:
 *          type: boolean
 */
