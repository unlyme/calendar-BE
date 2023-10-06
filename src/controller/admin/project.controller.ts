import { Response, Request } from "express";
import { ProjectService } from "../../services/project.service";

export class AdminProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  public index = async (_req: Request, res: Response) => {
    const projects = await this.projectService.index();

    return res.send(projects);
  }
}
