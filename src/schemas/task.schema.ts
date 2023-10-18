/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *  schemas:
 *    Task:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        text:
 *          type: string
 *    UpsertTaskInput:
 *      type: object
 *      required:
 *        - text
 *      properties:
 *        text:
 *          type: string
 */
