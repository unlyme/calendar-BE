import {getConnection} from 'typeorm';
import { ProjectServiceUnitRepository } from '../repository/projectServiceUnit.repository';
import { ProjectServiceUnit } from '../database/entities/projectServiceUnit.entity';

export class ProjectServiceUnitService {
  private projectServiceUnitRepository: ProjectServiceUnitRepository;

  constructor(){
    this.projectServiceUnitRepository = getConnection("schedule").getCustomRepository(ProjectServiceUnitRepository);
  }

  public create = async (payload: Partial<ProjectServiceUnit>) => {
    return await this.projectServiceUnitRepository.save(payload);
  }

  public getByServiceId = async (serviceId: number) => {
    return await this.projectServiceUnitRepository.find({
      where: {
        serviceId: serviceId
      },
      relations: ['project']
    })
  }
}
