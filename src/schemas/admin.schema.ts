import { object, string } from 'zod';

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *  schemas:
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
      required_error: 'Invalid credentials',
    }).email('Invalid credentials'),
    password: string({
      required_error: 'Invalid credentials',
    }).min(8, 'Invalid credentials'),
  }),
});