import { Response, Request } from "express";
import { HostingService } from "../../services/hosting.service";

export class AdminHostingController {
  hostingService: HostingService;

  constructor() {
    this.hostingService = new HostingService();
  }

  public create = async (req: Request, res: Response) => {
    try {
      const account = await this.hostingService.createAccount();

      return res.status(200).json({ account })
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
