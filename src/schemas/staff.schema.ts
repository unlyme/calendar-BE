import { object, string } from 'zod';

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *  schemas:
 *    Staff:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *          type: string
 *        isAdminPrivileges:
 *          type: boolean
 *        contacts:
 *          type: array
 *          items:
 *            type: string
 *    CreateStaffInput:
 *      type: object
 *      required:
 *        - login
 *        - firstName
 *        - lastName
 *        - isAdminPrivileges
 *        - email
 *        - password
 *      properties:
 *        login:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        password:
 *          type: string
 *        isAdminPrivileges:
 *          type: boolean
 *          default: false
 *        email:
 *          type: string
 *        contacts:
 *          type: array
 *          items:
 *            type: string
 *    UpdateStaffInput:
 *      type: object
 *      required:
 *        - login
 *        - firstName
 *        - lastName
 *        - isAdminPrivileges
 *        - email
 *        - password
 *        - newPassword
 *      properties:
 *        login:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        password:
 *          type: string
 *        newPassword:
 *          type: string
 *        isAdminPrivileges:
 *          type: boolean
 *          default: false
 *        email:
 *          type: string
 *        contacts:
 *          type: array
 *          items:
 *            type: string
 *    DeleteStaffResponse:
 *      type: object
 *      required:
 *        - success
 *      properties:
 *        success:
 *          type: boolean
 */
