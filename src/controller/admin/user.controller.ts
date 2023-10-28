import { Response, Request } from "express";
import { UserService } from "../../services/user.service";

export class AdminUserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public index = async (req: Request, res: Response) => {
    try {
      const { page, status } = req.query;
      const users = await this.userService.index(Number(page), {
        status: status?.toString(),
      });
      return res.status(200).json({ users });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
  public create = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const project = await this.userService.create(payload);
      return res.status(200).json({ project });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const { id } = req.params;
      const user = await this.userService.update(Number(id), payload);
      return res.status(200).json({ user });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.userService.delete(Number(id));

      return res.status(200).json({ id: Number(id), deleted });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public getProjects = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const projects = await this.userService.getProjectsByUser(Number(id));
      return res.status(200).json({ projects });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
