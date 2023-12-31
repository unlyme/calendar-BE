import {getConnection} from 'typeorm';
import { ProjectUserRepository } from '../repository/projectUser.repository';
import { ProjectUser } from '../database/entities/projectUser.entity';
import { Service } from '../database/entities/service.entity';

export class ProjectUserService {
  private projectUserRepository: ProjectUserRepository;

  constructor(){
    this.projectUserRepository = getConnection("schedule").getCustomRepository(ProjectUserRepository);
  }

  public create = async (payload: Partial<ProjectUser>) => {
    return await this.projectUserRepository.save(payload);
  }

  public update = async (projectUserId: number, payload: Partial<ProjectUser>) => {
    const updateResult = await this.projectUserRepository.update(projectUserId, payload);

    if (updateResult) {
      const updatedProject = await this.projectUserRepository.findOne({ id: projectUserId }, { relations: ['users'] });
      return updatedProject;
    }

    return undefined;
  }

  public delete = async (projectUserId: number) => {
    return await this.projectUserRepository.delete(projectUserId);
  }

  public getById = async (projectUserId: number) => {
    return await this.projectUserRepository.findOne(projectUserId);
  }

  public getByProject = async (projectId: number) => {
    return await this.projectUserRepository.find({
      where: {
        projectId: projectId,
      },
      relations: ['users', 'services']
    })
  }

  public getByUser = async (userId: number) => {
    const projectUsers =  await this.projectUserRepository.find({
      where: {
        userId: userId,
      },
      relations: ['projects', 'services']
    })

    return projectUsers
  }

  public getByProjectAndUser = async (projectId: number, userId: number) => {
    return await this.projectUserRepository.findOne({
      where: {
        projectId: projectId,
        userId: userId,
      },
      relations: ['users', 'projects']
    })
  }

  public updateServices = async (projectUserId: number, services: Service[]) => {
    const projectUser = await this.getById(projectUserId);

    if (!projectUser) {
      throw Error('Project User not found')
    }

    projectUser.services = services;

    return await this.projectUserRepository.save(projectUser);
  }
}
