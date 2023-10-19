import { Response, Request } from "express";
import { ServiceService } from "../../services/service.service";

export class AdminServiceController {
  private serviceService: ServiceService;

  constructor() {
    this.serviceService = new ServiceService();
  }

  public index = async (_req: Request, res: Response) => {
    try {
      const services = await this.serviceService.index();
      return res.status(200).json({ services })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
