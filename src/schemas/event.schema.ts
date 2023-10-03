/**
 * @swagger
 * components:
 *  schemas:
 *    Event:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        start_date:
 *          type: string
 *        end_date:
 *          type: string
 *        series_end_date:
 *          type: string
 *        all_day:
 *          type: boolean
 *        text:
 *          type: string
 *        recurring:
 *          type: string
 *        details:
 *          type: string
 *        color:
 *          type: string
 *        origin_id:
 *          type: string
 *        calendar:
 *          type: string
 *        unit:
 *          type: string
 *        section:
 *          type: string
 *        user:
 *          type: string
 *    UpsertEventInput:
 *      type: object
 *      required:
 *        - start_date
 *        - end_date
 *        - text
 *        - details
 *        - calendar
 *        - unit
 *        - section
 *      properties:
 *        start_date:
 *          type: string
 *          default: 2023-04-05 03:32:33
 *        end_date:
 *          type: string
 *          default: 2023-04-09 03:32:33
 *        text:
 *          type: string
 *          default: Test event
 *        details:
 *          type: string
 *          default: Event details
 *        calendar:
 *          type: string
 *          default: 1
 *        unit:
 *          type: string
 *          default: 2
 *        section:
 *          type: string
 *          default: 2
 *    DeleteEventResponse:
 *      type: object
 *      required:
 *        - success
 *      properties:
 *        success:
 *          type: boolean
 */
