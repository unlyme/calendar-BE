import { Response, Request } from "express";
import { AlphaHostingService } from "../../services/alphaHosting.service";

export class AdminAlphaHostingController {
  hostingService: AlphaHostingService;

  constructor() {
    this.hostingService = new AlphaHostingService();
  }

  public listAccount = async (_req: Request, res: Response) => {
    try {
      const accounts = await this.hostingService.listAccounts();

      return res.status(200).json({ accounts });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

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
      const { uid } = req.body;
      const account = await this.hostingService.suspendAccount(uid);

      return res.status(200).json({ account });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public unsuspendAccount = async (req: Request, res: Response) => {
    try {
      const { uid } = req.body;
      const account = await this.hostingService.unsuspendAccount(uid);

      return res.status(200).json({ account });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public deleteAccount = async (req: Request, res: Response) => {
    try {
      const { uid } = req.query;
      const deleted = await this.hostingService.deleteAccount(
        Number(uid)
      );

      return res.status(200).json({ deleted });
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

  public assignToProject = async (req: Request, res: Response) => {
    try {
      const { uid, projectId } = req.body;
      const hostingRecord = await this.hostingService.assignToProject(
        parseInt(projectId),
        Number(uid)
      );

      return res.status(200).json({ hostingRecord });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public createUserSession = async (req: Request, res: Response) => {
    try {
      const { uid } = req.body;
      const userSession = await this.hostingService.createUserSession(uid);

      return res.status(200).json({ userSession });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public getPlans = async (_req: Request, res: Response) => {
    try {
      const plans = await this.hostingService.getPlans();

      return res.status(200).json({ plans });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  public getUserServices = async (req: Request, res: Response) => {
    try {
      const { uid } = req.query;
      const userSevices = await this.hostingService.getUserServices(Number(uid));

      return res.status(200).json({ userSevices });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
