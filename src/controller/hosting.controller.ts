import { Response, Request } from "express";
import { HostingService } from "../services/hosting.service";

export class HostingController {
  hostingService: HostingService;

  constructor() {
    this.hostingService = new HostingService();
  }

  public createUserSession = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.body;
      const userSession = await this.hostingService.createUserSessionFromWeb(parseInt(projectId));

      return res.status(200).json({ userSession });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
