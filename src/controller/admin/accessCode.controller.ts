import { Response, Request } from "express";
import { AccessCodeService } from "../../services/accessCode.service";

export class AdminAccessCodeController {
  private accessCodeService: AccessCodeService;

  constructor() {
    this.accessCodeService = new AccessCodeService();
  }

  public index = async (_req: Request, res: Response) => {
    try {
      const acceessCode = await this.accessCodeService.index();
      return res.status(200).json({ acceessCode })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public create = async (_req: Request, res: Response) => {
    try {
      const accessCode = await this.accessCodeService.generateCode();
      return res.status(200).json({ accessCode })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
