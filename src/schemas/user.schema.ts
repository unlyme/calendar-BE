import { object, string } from 'zod';

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *  schemas:
 *    User:
 *      type: object
 *      proerties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *        - passwordConfirm
 *      properties:
 *        name:
 *          type: string
 *          default: John doe
 *        email:
 *          type: string
 *          default: john@doe.com
 *        password:
 *          type: string
 *          default: password123
 *        passwordConfirm:
 *          type: string
 *          default: password123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        id:
 *          type: string
 *    LoginUserInput:
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
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        access_token:
 *          type: string
 */

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required',
    }),
    lastName: string({
      required_error: 'Last name is required',
    }),
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    projectName: string({
      required_error: 'Project Name is required',
    }),
    accessCode: string({
      required_error: 'Code is required',
    }),
  })
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email address is required',
    }).email('Invalid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
});
