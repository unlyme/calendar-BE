import { Response, Request } from "express";
import { ProjectUserService } from "../../services/projectUser.service";

export class AdminProjectUserController {
  private projectUserService: ProjectUserService;

  constructor() {
    this.projectUserService = new ProjectUserService();
  }

  public update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      delete payload.serviceIds;
      const project = await this.projectUserService.update(Number(id), payload);
      return res.status(200).json({ project })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.projectUserService.delete(Number(id));
      return res.status(200).json({ success: true })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
