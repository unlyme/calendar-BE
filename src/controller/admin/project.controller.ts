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

  public create = async (req: Request, res: Response) => {
    const payload = req.body;
    const project = await this.projectService.create(payload);
    return res.send(project);
  }

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const project = await this.projectService.update(Number(id), payload);
    return res.send(project);
  }

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await this.projectService.delete(Number(id));
    return res.send(deleted)
  }

  public assignUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.body;

    await this.projectService.assginUser(Number(id), Number(userId));

    return res.json({ status: 200, message: true })
  }
}
