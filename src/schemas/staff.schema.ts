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
 *    LoginAdminInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: john@doe.com
 *        password:
 *          type: string
 *          default: password123
 *    LoginAdminResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        access_token:
 *          type: string
 */

export const loginAdminSchema = object({
  body: object({
    email: string({
      required_error: 'Email Invalid credentials',
    }).email('Email Invalid credentials'),
    password: string({
      required_error: 'password Invalid credentials',
    }).min(8, 'password Invalid credentials'),
  }),
});
