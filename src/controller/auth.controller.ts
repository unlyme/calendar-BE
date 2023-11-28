import { Response, Request, NextFunction, CookieOptions } from "express";
import { UserService } from "../services/user.service";
import AppError from "../utils/appError";
import { User } from "../database/entities/user.entity";
import { signJwt, verifyJwt } from "../utils/jwt"; // import service
import { ProjectUserService } from "../services/projectUser.service";
require('dotenv').config();

export class AuthController {
  private userService: UserService;
  private projectUserService: ProjectUserService;

  constructor() {
    this.userService = new UserService(); // Create a new instance of UserController
    this.projectUserService = new ProjectUserService();
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
    const { firstName, lastName, password, email, contacts } = req['body'];

    const newUser = await this.userService.create({ email: email.toLowerCase(), firstName, lastName, contacts, password });
    if (newUser) {
      const { password, ...userWithoutPassword } = newUser;
      res.json(userWithoutPassword)
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
      return res.status(401).json({ message: 'This user has not been added to any of the projects.' });
    }

    const activeProjects = projects.filter(project => project.status === 'ACTIVE');

    if (!activeProjects.length) {
      return res.status(401).json({ message: 'This user has not been activated to any of the projects.' });
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
}
