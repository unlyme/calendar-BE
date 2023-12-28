import { Response, Request, NextFunction, CookieOptions } from "express";
import { UserService } from "../services/user.service";
import AppError from "../utils/appError";
import { User } from "../database/entities/user.entity";
import { signJwt, verifyJwt } from "../utils/jwt"; // import service
import { ProjectUserService } from "../services/projectUser.service";
import { PROJECT_USER_STATUS } from "../database/enums/projectUser.enum";
import { PROJECT_STATUS } from "../database/enums/project.enum";
import { AccessCodeService } from "../services/accessCode.service";
import { RequestAccessService } from "../services/requestAccess.service";
require('dotenv').config();

export class AuthController {
  private userService: UserService;
  private projectUserService: ProjectUserService;
  private accessCodeService: AccessCodeService;
  private requestAccessService: RequestAccessService;

  constructor() {
    this.userService = new UserService(); // Create a new instance of UserController
    this.projectUserService = new ProjectUserService();
    this.accessCodeService = new AccessCodeService();
    this.requestAccessService = new RequestAccessService();
  }

  private cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
  };

  private accessTokenCookieOptions: CookieOptions = {
    ...this.cookiesOptions,
    expires: new Date(
      Date.now() + parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15') * 60 * 1000
    ),
    maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15') * 60 * 1000,
  };

  private refreshTokenCookieOptions: CookieOptions = {
    ...this.cookiesOptions,
    expires: new Date(
      Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN ?? '60') * 60 * 1000
    ),
    maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN ?? '60') * 60 * 1000,
  };

  public register = async (req: Request, res: Response) => {
    const { firstName, lastName, projectName, email, accessCode } = req['body'];

    const { newUser } = await this.userService.register(firstName, lastName, email.toLowerCase().trim(), projectName, accessCode);
    if (newUser) {
      const { access_token, refresh_token } = await this.userService.signTokens(newUser);

      res.cookie('access_token', access_token, this.accessTokenCookieOptions);
      res.cookie('refresh_token', refresh_token, this.refreshTokenCookieOptions);
      res.cookie('logged_in', true, {
        ...this.accessTokenCookieOptions,
        httpOnly: false,
      });

      return res.status(200).json({
        status: 'success',
        access_token,
      });
    } else {
      res.status(500).json({message: 'failed'})
    }
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req['body'];
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!(await User.comparePasswords(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { access_token, refresh_token } = await this.userService.signTokens(user);

    const projects = await this.projectUserService.getByUser(user.id);

    if (!projects.length) {
      return res.status(403).json({ message: 'This user has not been added to any of the projects.' });
    }

    const activeProjectUsers = projects.filter(project => project.status === PROJECT_USER_STATUS.ACTIVE);

    if (!activeProjectUsers.length) {
      return res.status(403).json({ message: 'This user has not been activated to any of the projects.' });
    }

    const activeProjects = projects.filter(
      (projectUser) =>
        projectUser.projects.status === PROJECT_STATUS.ACTIVE
    );

    if (!activeProjects.length) {
      return res.status(403).json({ message: 'Projects are blocked.' });
    }

    res.cookie('access_token', access_token, this.accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, this.refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...this.accessTokenCookieOptions,
      httpOnly: false,
    });

    return res.status(200).json({
      status: 'success',
      access_token,
    });
  }

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie('access_token', '', { maxAge: 1 });
      res.cookie('refresh_token', '', { maxAge: 1 });
      res.cookie('logged_in', '', { maxAge: 1 });

      return res.status(200).json({
        status: 'success',
      });
    } catch (e) {
      next(e);
    }
  }

  public refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = res['locals']['cookies']['refresh_token'];
      const message = 'Could not refresh access token';

      if (!refresh_token) {
        return next(new AppError(403, message));
      }

      const decoded = verifyJwt<{ sub: string }>(
        refresh_token,
        'JWT_REFRESH_TOKEN_PUBLIC_KEY'
      );

      if (!decoded) {
        return next(new AppError(403, message));
      }

      const user = await this.userService.findUserById(parseInt(decoded.sub));

      if (!user) {
        return next(new AppError(403, message));
      }

      const access_token = signJwt({ sub: user.id }, 'JWT_ACCESS_TOKEN_PRIVATE_KEY', {
        expiresIn: `${parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15')}m`,
      });

      res.cookie('access_token', access_token, this.accessTokenCookieOptions);
      res.cookie('logged_in', true, {
        ...this.accessTokenCookieOptions,
        httpOnly: false,
      });

      return res.status(200).json({
        status: 'success',
        access_token,
      });
    } catch (err: any) {
      next(err);
    }
  }

  public verifyAccessCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.body;

      const accessCode = await this.accessCodeService.getByCode(code);

      if (!accessCode) {
        return res.status(403).json({ status: 'error', valid: false, message: 'Access code is invalid' });
      }

      if (accessCode.userId) {
        return res.status(200).json({ status: 'error', valid: true, used: true, message: 'Access code is used' });
      }

      return res.status(200).json({ status: 'success', valid: true, used: false })
    } catch (error) {
      next(error);
    }
  }

  public verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const user = await this.userService.findUserByEmail(email.toLowerCase().trim());

      if (user) {
        return res.status(200).json({ status: 'error', valid: false, message: 'Email is already used' });
      }

      return res.status(200).json({ status: 'success', valid: true });

    } catch (error) {
      next(error);
    }
  }

  public requestAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const requestAccess = await this.requestAccessService.create(email);

      return res.status(200).json({ status: 'success', requestAccess });
    } catch (error) {
      next(error);
    }
  }
}
