import { Response, Request } from "express";
import { ServiceService } from "../../services/service.service";
import { ProjectServiceUnitService } from "../../services/projectServiceUnit.service";

export class AdminServiceController {
  private serviceService: ServiceService;
  private projectServiceUnitService: ProjectServiceUnitService;

  constructor() {
    this.serviceService = new ServiceService();
    this.projectServiceUnitService = new ProjectServiceUnitService();
  }

  public index = async (_req: Request, res: Response) => {
    try {
      const services = await this.serviceService.index();
      return res.status(200).json({ services })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public getUnitServices = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const units = await this.projectServiceUnitService.getByServiceId(Number(id));
      return res.status(200).json({ units })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const unit = await this.projectServiceUnitService.update(
        Number(id),
        req.body
      )

      return res.status(200).json({ unit })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.projectServiceUnitService.delete(Number(id))

      return res.status(200).json({ deleted })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
