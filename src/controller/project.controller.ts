import { Response, Request } from "express";
import { ProjectUserService } from "../services/projectUser.service";
import { User } from "../database/entities/user.entity";

export class ProjectController {
  private projectUserService: ProjectUserService;

  constructor(){
    this.projectUserService = new ProjectUserService();  }

  public index = async (_req: Request, res: Response) => {
    try {
      const user = res['locals']['user'] as User;
      const projects = await this.projectUserService.getByUser(user.id);

      return res.status(200).json({ projects })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
