import { Response, Request } from "express";
import { UnitService } from "../services/unit.service"; // import service

export class UnitController {
  private unitService: UnitService;
  
  constructor(){
    this.unitService = new UnitService(); // Create a new instance of UnitController
  }
  
  public index = async (req: Request, res: Response) => {
    const units = await this.unitService.index();
    res.send(units).json();
  }
}
