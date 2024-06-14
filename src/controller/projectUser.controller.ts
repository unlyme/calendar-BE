import { Response, Request } from "express";
import { User } from "../database/entities/user.entity";
import { ProjectUserService } from "../services/projectUser.service";
import { UserService } from "../services/user.service";

export class ProjectUserController {
  private projectUserService: ProjectUserService;
  private userService: UserService;

  constructor(){
    this.projectUserService = new ProjectUserService();
    this.userService = new UserService();
  }

  public index = async (req: Request, res: Response) => {
    try {
      const user = res['locals']['user'] as User;
      const includesCurrentUser = req['query']['includesCurrentUser'];
      const { id } = req.params;
      const project = await this.projectUserService.getByProject(parseInt(id));
      let userIds = project.map(p => p.userId)
      if (!includesCurrentUser) {
        userIds = project.map(p => p.userId).filter(id => id !== user.id);
      }
      const users = await this.userService.findUserByIds(userIds);

      return res.status(200).json({ users })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
