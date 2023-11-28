import { Response, Request } from "express";
import { ProjectUserService } from "../services/projectUser.service";
import { User } from "../database/entities/user.entity";
import { PROJECT_USER_STATUS } from "../database/enums/projectUser.enum";
import { PROJECT_STATUS } from "../database/enums/project.enum";
import { ProjectServiceUnitService } from "../services/projectServiceUnit.service";
import { PROJECT_SERVICE_UINIT_STATUS } from "../database/enums/projectServiceUnit.enum";

export class ProjectController {
  private projectUserService: ProjectUserService;
  private projectServiceUnitService: ProjectServiceUnitService;

  constructor() {
    this.projectUserService = new ProjectUserService();
    this.projectServiceUnitService = new ProjectServiceUnitService();
  }

  public index = async (_req: Request, res: Response) => {
    try {
      const user = res["locals"]["user"] as User;
      const projectUsers = await this.projectUserService.getByUser(user.id);

      const projects = projectUsers.map((projectUser) => ({
        ...projectUser,
        status:
          projectUser.status === PROJECT_USER_STATUS.ACTIVE &&
          projectUser.projects.status === PROJECT_STATUS.ACTIVE
            ? PROJECT_USER_STATUS.ACTIVE
            : PROJECT_USER_STATUS.SUSPENDED,
      }));

      return res.status(200).json({ projects });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public getServiceUnits = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const serviceUnits = await this.projectServiceUnitService.getByProjectId(
        Number(id)
      );
      const services = serviceUnits
        .filter(
          (serviceUnit) =>
            serviceUnit.status === PROJECT_SERVICE_UINIT_STATUS.ACTIVE
        )
        .map((serviceUnits) => serviceUnits.service);

      return res.status(200).json({ services });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
