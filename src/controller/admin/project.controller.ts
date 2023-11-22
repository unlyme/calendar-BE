import { Response, Request } from "express";
import { ProjectService } from "../../services/project.service";

export class AdminProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  public index = async (req: Request, res: Response) => {
    try {
      const { page, status } = req.query;
      const projects = await this.projectService.index(Number(page), {
        status: status?.toString(),
      });

      return res.status(200).json({ projects })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const project = await this.projectService.create(payload, payload.serviceIds);
      return res.status(200).json({ project })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const { serviceIds } = req.body;
      delete payload.serviceIds;
      const project = await this.projectService.update(Number(id), payload, serviceIds);
      return res.status(200).json({ project })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.projectService.delete(Number(id));
      return res.status(200).json({ deleted })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public assignUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { userId, serviceIds } = req.body;

      const serviceIdNumbers = serviceIds?.length ? serviceIds.map((serviceId: any) => Number(serviceId)) : [];
      await this.projectService.assginUser(Number(id), Number(userId), serviceIdNumbers);

      return res.status(200).json({ success: true })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public getUsers = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const projectUsers = await this.projectService.getUsersByProject(Number(id));

      return res.status(200).json({ projectUsers })
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public assignServicesToUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { userId, serviceIds } = req.body;
      const projectUser = await this.projectService.assignServicesToUser(Number(id), userId, serviceIds)

      return res.status(200).json({ projectUser })
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public getProjectServices = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const services = await this.projectService.getProjectServices(Number(id))

      return res.status(200).json({ services })
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
