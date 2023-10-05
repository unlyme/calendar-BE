import { Response, Request, NextFunction } from "express";
import { AdminService } from "../services/admin.service";
import AppError from "../utils/appError";
import { Admin } from "../database/entities/admin.entity";

export class AdminAuthController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

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
  }
}
