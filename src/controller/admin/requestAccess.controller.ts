import { Response, Request } from "express";
import { RequestAccessService } from "../../services/requestAccess.service";

export class AdminRequestAccessController {
  private requestAccessService: RequestAccessService;

  constructor() {
    this.requestAccessService = new RequestAccessService();
  }

  public index = async (_req: Request, res: Response) => {
    try {
      const requestAccesses = await this.requestAccessService.index();
      return res.status(200).json({ requestAccesses })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public sendCodeToUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const requestAccesses = await this.requestAccessService.sendCode(Number(id));
      return res.status(200).json({ requestAccesses })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
