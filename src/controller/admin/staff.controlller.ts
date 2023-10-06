import { Response, Request } from "express";
import { StaffService } from "../../services/staff.service";

export class StaffController {
  private staffService: StaffService;

  constructor() {
    this.staffService = new StaffService();
  }

  public index = async (_req: Request, res: Response) => {
    const staffs = await this.staffService.index();

    return res.send(staffs);
  }
}
