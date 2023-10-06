import { Response, Request } from "express";
import { UserService } from "../../services/user.service";

export class AdminUserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public index = async (_req: Request, res: Response) => {
    const users = await this.userService.index();

    return res.send(users);
  }
}
