import {Router} from "express";
import {validate} from "../middleware/validate";
import {deserializeUser} from "../middleware/deserializeUser";
import {createUserSchema, loginUserSchema} from "../schemas/user.schema";
import {requireUser} from "../middleware/requireUser";
import {AuthController} from "../controller/auth.controller";
import {UserController} from "../controller/user.controller";

export const authRoutes = () => {
  const router = Router();
  const authController = new AuthController();
  const userController = new UserController();
  /**
   * @swagger
   * tags:
   *   name: Auth
   *   description: The auth API
   * /auth/register:
   *   post:
   *     summary: Register new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *       200:
   *         description: The created user.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *
   * /auth/login:
   *   post:
   *     summary: Login user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/LoginUserInput'
   *     responses:
   *       200:
   *         description: Logged user info.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/LoginUserResponse'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   *
   * /auth/logout:
   *   get:
   *     summary: Logout user
   *     tags: [Auth]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: The access token has been successfully invalidated.
   *       401:
   *         description: The user is not authenticated.
   *       500:
   *         description: An error occurred while invalidating the access token.
   *
   * /auth/refresh:
   *   get:
   *     summary: Get refresh token
   *     tags: [Auth]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: Get refresh token.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/LoginUserResponse'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   * /auth/me:
   *   get:
   *     summary: Get user profile
   *     tags: [Auth]
   *     security:
   *      - BearerAuth: []
   *     responses:
   *       200:
   *         description: Logged user info.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Some server error
   */
  router.post('/register', validate(createUserSchema), authController.register);
  router.post('/login', validate(loginUserSchema), authController.login);
  router.get('/logout', deserializeUser, requireUser, authController.logout);
  router.get('/refresh', deserializeUser, requireUser, authController.refresh);
  router.get('/me', deserializeUser, userController.me);
  router.post('/verifyCode', authController.verifyAccessCode);
  return router;
}
