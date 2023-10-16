/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *  schemas:
 *    Project:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        balance:
 *          type: number
 *        geography:
 *          type: string
 *        active:
 *          type: boolean
 *        projectServices:
 *          type: array
 *          items:
 *            type: string
 *    CreateProjectInput:
 *      type: object
 *      required:
 *        - name
 *        - geography
 *        - active
 *        - projectServices
 *      properties:
 *        name:
 *          type: string
 *        geography:
 *          type: string
 *        active:
 *          type: boolean
 *        projectServices:
 *          type: array
 *          items:
 *            type: number
 *    UpdateStaffInput:
 *      type: object
 *      required:
 *        - name
 *        - geography
 *        - active
 *        - projectServices
 *      properties:
 *        name:
 *          type: string
 *        geography:
 *          type: string
 *        active:
 *          type: boolean
 *        projectServices:
 *          type: array
 *          items:
 *            type: number
 *    DeleteStaffResponse:
 *      type: object
 *      required:
 *        - success
 *      properties:
 *        success:
 *          type: boolean
 */
