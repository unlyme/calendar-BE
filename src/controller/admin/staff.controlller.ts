import { Response, Request } from "express";
import { StaffService } from "../../services/staff.service";
import { Staff } from "../../database/entities/staff.entity";

export class StaffController {
  private staffService: StaffService;

  constructor() {
    this.staffService = new StaffService();
  }

  public index = async (req: Request, res: Response) => {
    try {
      const { page, status } = req.query;
      const staffs = await this.staffService.index(Number(page), {
        status: status?.toString() ?? undefined,
      });

      return res.status(200).json({ staffs });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const staff = await this.staffService.create(payload as Staff);
      return res.status(200).json({ staff });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const payload: Staff = req.body;
      const { id } = req.params;
      const staff = await this.staffService.update(Number(id), payload);
      return res.status(200).json({ staff });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.staffService.delete(Number(id));

      return res.status(200).json({ id: Number(id), deleted });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
