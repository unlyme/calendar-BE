import {getConnection} from 'typeorm';
import { ProjectUserRepository } from '../repository/projectUser.repository';
import { ProjectUser } from '../database/entities/projectUser.entity';

export class ProjectUserService {
  private projectUserRepository: ProjectUserRepository;

  constructor(){
    this.projectUserRepository = getConnection("schedule").getCustomRepository(ProjectUserRepository);
  }

  public create = async (payload: Partial<ProjectUser>) => {
    return await this.projectUserRepository.save(payload);
  }

  public getByProject = async (projectId: number) => {
    return await this.projectUserRepository.find({
      where: {
        projectId: projectId,
      },
      relations: ['users']
    })
  }
}
