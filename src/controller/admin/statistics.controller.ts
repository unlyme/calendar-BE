import { Response, Request } from "express";
import { UserService } from "../../services/user.service";
import { ProjectService } from "../../services/project.service";

export class AdminStatisticsController {
  private userService: UserService;
  private projectService: ProjectService;

  constructor() {
    this.userService = new UserService();
    this.projectService = new ProjectService();
  }

  public index = async (_req: Request, res: Response) => {
    try {
      const usersCount = await this.userService.getUsersCount();
      const newUsersCount = await this.userService.getNewUsersCountLastDays(7);
      const projectsCount = await this.projectService.getProjectsCount();
      const newProjectsCount = await this.projectService.getNewProjectsCountLastDays(7);

      return res.status(200).json({
        usersCount,
        newUsersCount,
        projectsCount,
        newProjectsCount
      })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
