import { Router, Response, Request } from "express";
import { UnitService } from "../services/unit.service"; // import service

export class UnitController {
  public router: Router;
  private unitService: UnitService;
  
  constructor(){
    this.unitService = new UnitService(); // Create a new instance of UnitController
    this.router = Router();
    this.routes();
  }
  
  public index = async (req: Request, res: Response) => {
    const units = await this.unitService.index();
    res.send(units).json();
  }
  
  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('/', this.index);
  }
}
