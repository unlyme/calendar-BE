import { Response, Request } from "express";
import { StaffService } from "../../services/staff.service";
import { Staff } from "../../database/entities/staff.entity";

export class StaffController {
  private staffService: StaffService;

  constructor() {
    this.staffService = new StaffService();
  }

  public index = async (_req: Request, res: Response) => {
    const staffs = await this.staffService.index();

    return res.send(staffs);
  }

  public create = async (req: Request, res: Response) => {
    const payload = req.body;
    const staff = await this.staffService.create(payload as Staff);
    return res.send(staff);
  }

  public update = async (req: Request, res: Response) => {
    const payload: Staff = req.body
    const { id } = req.params;
    const staff = await this.staffService.update(Number(id), payload);

    return res.send(staff);
  }

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await this.staffService.delete(Number(id));

    return res.send(deleted)
  }
}
