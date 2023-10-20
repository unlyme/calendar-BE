import { Response, Request } from "express";
import { UserService } from "../../services/user.service";

export class AdminUserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public index = async (_req: Request, res: Response) => {
    try {
      const users = await this.userService.index();
      return res.status(200).json({ users });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
