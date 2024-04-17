import { Response, Request } from "express";
import { HostingService } from "../../services/hosting.service";

export class AdminHostingController {
  hostingService: HostingService;

  constructor() {
    this.hostingService = new HostingService();
  }

  public createAccount = async (req: Request, res: Response) => {
    try {
      const account = await this.hostingService.createAccount(req.body);

      return res.status(200).json({ account })
    } catch (error: any) {
      return res.status(200).json({ error: error.message });
    }
  }

  public suspendAccount = async (req: Request, res: Response) => {
    try {
      const { username } = req.body;
      const account = await this.hostingService.suspendAccount(username);

      return res.status(200).json({ account })
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public unsuspendAccount = async (req: Request, res: Response) => {
    try {
      const { username } = req.body;
      const account = await this.hostingService.unsuspendAccount(username);

      return res.status(200).json({ account })
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public deleteAccount = async (req: Request, res: Response) => {
    try {
      const { username } = req.query;
      const account = await this.hostingService.deleteAccount(username as string);

      return res.status(200).json({ account })
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public listAccount = async (_req: Request, res: Response) => {
    try {
      const accounts = await this.hostingService.listAccounts();

      return res.status(200).json({ accounts })
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
