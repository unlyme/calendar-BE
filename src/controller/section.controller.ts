import { Router, Response, Request } from "express";
import { SectionService } from "../services/section.service"; // import service

export class SectionController {
  public router: Router;
  private sectionService: SectionService;
  
  constructor(){
    this.sectionService = new SectionService(); // Create a new instance of SectionController
    this.router = Router();
    this.routes();
  }
  
  public index = async (req: Request, res: Response) => {
    const sections = await this.sectionService.index();
    res.send(sections).json();
  }
  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('/', this.index);
  }
}
