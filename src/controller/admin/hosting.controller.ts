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

      return res.status(200).json({ account });
    } catch (error: any) {
      return res.status(200).json({ error: error.message });
    }
  };

  public suspendAccount = async (req: Request, res: Response) => {
    try {
      const { username } = req.body;
      const account = await this.hostingService.suspendAccount(username);

      return res.status(200).json({ account });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public unsuspendAccount = async (req: Request, res: Response) => {
    try {
      const { username } = req.body;
      const account = await this.hostingService.unsuspendAccount(username);

      return res.status(200).json({ account });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public deleteAccount = async (req: Request, res: Response) => {
    try {
      const { username } = req.query;
      const account = await this.hostingService.deleteAccount(
        username as string
      );

      return res.status(200).json({ account });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public listAccount = async (_req: Request, res: Response) => {
    try {
      const accounts = await this.hostingService.listAccounts();

      return res.status(200).json({ accounts });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public createUserSession = async (req: Request, res: Response) => {
    try {
      const { username } = req.body;
      const userSession = await this.hostingService.createUserSession(username);

      return res.status(200).json({ userSession });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public assignToProject = async (req: Request, res: Response) => {
    try {
      const { cpanelUsername, projectId } = req.body;
      const hostingRecord = await this.hostingService.assignToProject(
        parseInt(projectId),
        cpanelUsername
      );

      return res.status(200).json({ hostingRecord });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public getHostingRecords = async (req: Request, res: Response) => {
    try {
      const { skipAssigned } = req.query;
      const hostingRecords = await this.hostingService.listHostingRecords(
        Boolean(skipAssigned)
      );

      return res.status(200).json({ hostingRecords });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
