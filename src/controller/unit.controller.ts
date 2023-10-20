import { Response, Request } from "express";
import { UnitService } from "../services/unit.service"; // import service

export class UnitController {
  private unitService: UnitService;

  constructor(){
    this.unitService = new UnitService(); // Create a new instance of UnitController
  }

  public index = async (_req: Request, res: Response) => {
    try {
      const units = await this.unitService.index();
      return res.status(200).json({ units })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
