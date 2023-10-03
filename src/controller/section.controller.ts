import { Response, Request } from "express";
import { SectionService } from "../services/section.service"; // import service

export class SectionController {
  private sectionService: SectionService;
  
  constructor(){
    this.sectionService = new SectionService(); // Create a new instance of SectionController
  }
  
  public index = async (req: Request, res: Response) => {
    const sections = await this.sectionService.index();
    res.send(sections).json();
  }
}
