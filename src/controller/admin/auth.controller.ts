import { Response, Request, NextFunction, CookieOptions } from "express";
import { AdminService } from "../../services/admin.service";
import AppError from "../../utils/appError";
import { Admin } from "../../database/entities/admin.entity";
import { signJwt, verifyJwt } from "../../utils/jwt";

export class AdminAuthController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
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

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError(401, 'Invalid credentials'));
    }

    const admin = await this.adminService.findAdminByEmail(email);

    if (!admin) {
      return next(new AppError(401, 'Invalid credentials'));
    }

    if (!(await Admin.comparePasswords(password, admin.password))) {
      return next(new AppError(401, 'Invalid credentials'));
    }

    const { access_token, refresh_token } = await this.adminService.signTokens(admin);

    res.cookie('access_token', access_token, this.accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, this.refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...this.accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      access_token,
    });
  }

  public logout = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie('access_token', '', { maxAge: 1 });
      res.cookie('refresh_token', '', { maxAge: 1 });
      res.cookie('logged_in', '', { maxAge: 1 });

      res.status(200).json({
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

      const user = await this.adminService.findAdminById(parseInt(decoded.sub));

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

      res.status(200).json({
        status: 'success',
        access_token,
      });
    } catch (err: any) {
      next(err);
    }
  }
}
