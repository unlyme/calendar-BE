import { Response, Request } from "express";
import { AdminService } from "../../services/admin.service";

export class StaffController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  public index = async (_req: Request, res: Response) => {
    const staffs = await this.adminService.index();

    return res.send(staffs);
  }
}
