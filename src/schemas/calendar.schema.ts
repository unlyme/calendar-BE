/**
 * @swagger
 * components:
 *  schemas:
 *    Calendar:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        text:
 *          type: string
 *        color:
 *          type: string
 *        active:
 *          type: boolean
 *    UpsertCalendarInput:
 *      type: object
 *      required:
 *        - text
 *        - color
 *        - active
 *      properties:
 *        text:
 *          type: string
 *          default: Public
 *        color:
 *          type: string
 *          default: '#000000'
 *        active:
 *          type: boolean
 *          default: true
 *    DeleteCalendarResponse:
 *      type: object
 *      required:
 *        - success
 *      properties:
 *        success:
 *          type: boolean
 */
