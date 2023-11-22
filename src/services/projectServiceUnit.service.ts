import {getConnection} from 'typeorm';
import { ProjectServiceUnitRepository } from '../repository/projectServiceUnit.repository';
import { ProjectServiceUnit } from '../database/entities/projectServiceUnit.entity';
import { ProjectUserService } from './projectUser.service';

export class ProjectServiceUnitService {
  private projectServiceUnitRepository: ProjectServiceUnitRepository;
  private projectUserService: ProjectUserService;

  constructor(){
    this.projectServiceUnitRepository = getConnection("schedule").getCustomRepository(ProjectServiceUnitRepository);
    this.projectUserService = new ProjectUserService();
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

  public getByProjectId = async (projectId: number) => {
    return await this.projectServiceUnitRepository.find({
      where: {
        projectId: projectId
      },
      relations: ['service']
    })
  }

  public update = async (unitId: number, payload: Partial<ProjectServiceUnit>) => {
    const unit = await this.projectServiceUnitRepository.findOne({
      id: unitId,
    });

    if (!unit) {
      throw Error('Unit not found');
    }

    await this.projectServiceUnitRepository.update(unitId, payload)

    const updated = await this.projectServiceUnitRepository.findOne({
      id: unitId,
    }, {
      relations: ['project']
    });

    return updated;
  }

  public delete = async (unitId: number) => {
    const unit = await this.projectServiceUnitRepository.findOne({
      id: unitId,
    });

    if (!unit) {
      throw Error('Unit not found');
    }
    const projecUsers = await this.projectUserService.getByProject(unit.projectId);

    for (const projectUser of projecUsers) {
      const services = projectUser.services.filter(s => s.id !== unit.serviceId);
      await this.projectUserService.updateServices(projectUser.id, services);
    }

    await this.projectServiceUnitRepository.delete(unitId);

    return unit;
  }
}
