import { getConnection } from "typeorm";
import { ServiceRepository } from "../repository/service.repository";
import { Service } from "../database/entities/service.entity";

export class ServiceService {
  private serviceSerivce: ServiceRepository;

  constructor() {
    this.serviceSerivce =
      getConnection("schedule").getCustomRepository(ServiceRepository);
  }

  public index = async () => {
    return await this.serviceSerivce.find({
      order: {
        id: "ASC",
      },
    });
  };

  public findServiceById = async (id: number) => {
    return await this.serviceSerivce.findOne({ id });
  }

  public create = async (service: Service) => {
    return await this.serviceSerivce.save(service);
  };

  public update = async (id: number, service: Partial<Service>) => {
    return await this.serviceSerivce.update(id, service);
  };

  public delete = async (id: number) => {
    return await this.serviceSerivce.delete(id);
  };

  public findByIds = async (ids: number[]) => {
    return await this.serviceSerivce.findByIds(ids);
  }
}
