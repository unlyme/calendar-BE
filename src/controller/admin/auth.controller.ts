import { Response, Request, NextFunction, CookieOptions } from "express";
import { AdminService } from "../../services/admin.service";
import AppError from "../../utils/appError";
import { Admin } from "../../database/entities/admin.entity";

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
}
