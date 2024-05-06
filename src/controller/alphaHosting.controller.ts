import { Response, Request } from "express";
import { AlphaHostingService } from "../services/alphaHosting.service";

export class AlphaHostingController {
  hostingService: AlphaHostingService;

  constructor() {
    this.hostingService = new AlphaHostingService();
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
