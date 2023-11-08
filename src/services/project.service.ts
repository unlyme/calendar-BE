import { Between, getConnection } from "typeorm";
import { Project } from "../database/entities/project.entity";
import { ProjectRepository } from "../repository/project.repository";
import { ServiceService } from "./service.service";
import { Service } from "../database/entities/service.entity";
import { ProjectUserService } from "./projectUser.service";
import { UserService } from "./user.service";
import dayjs from "dayjs";

export class ProjectService {
  private projectRepository: ProjectRepository;
  private serviceService: ServiceService;
  private projectUserService: ProjectUserService;
  private userService: UserService;

  constructor() {
    this.projectRepository =
      getConnection("schedule").getCustomRepository(ProjectRepository);
    this.serviceService = new ServiceService();
    this.projectUserService = new ProjectUserService();
    this.userService = new UserService();
  }

  public index = async (page: number = 1, condition?: { status?: string }) => {
    const take = 10;
    const skip = (page - 1) * take;

    let where: { status?: string } = {};

    if (condition?.status) {
      where.status = condition.status;
    }

    return await this.projectRepository.find({
      where,
      order: {
        id: 'ASC'
      },
      skip: skip,
      take: take
    })
  };

  public findProjectById = async (id: number) => {
    return await this.projectRepository.findOne({ id });
  };

  public create = async (project: Project, serviceIds: number[]) => {
    const services = [];
    for (const serviceId of serviceIds) {
      const service = await this.serviceService.findServiceById(serviceId);
      services.push(service);
    }

    project.projectServices = services as Service[];

    return await this.projectRepository.save(project);
  };

  public update = async (
    id: number,
    project: Partial<Project>,
    serviceIds: number[] = []
  ) => {
    const services = await this.serviceService.findByIds(serviceIds);
    const updateResult = await this.projectRepository.update(id, project);

    if (updateResult) {
      const updatedProject = await this.findProjectById(id);

      updatedProject!.projectServices = services;

      await this.projectRepository.save(updatedProject!);

      return updatedProject;
    }
    return undefined;
  };

  public delete = async (id: number) => {
    return await this.projectRepository.delete(id);
  };

  public assginUser = async (projectId: number, userId: number) => {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw Error("User not found");
    }

    const project = await this.projectRepository.findOne(projectId);

    if (!project) {
      throw Error("Project not found");
    }

    return await this.projectUserService.create({
      projectId: projectId,
      userId: userId,
    });
  };

  public getProjectsCount = async () => {
    return await this.projectRepository.count({});
  };

  public getNewProjectsCountLastDays = async (days: number) => {
    const today = dayjs();
    const dayInPast = dayjs().subtract(days, "days");

    return await this.projectRepository.count({
      where: {
        createdAt: Between(dayInPast, today),
      },
    });
  };

  public getUsersByProject = async (projectId: number) => {
    const projectUsers = await this.projectUserService.getByProject(projectId);
    const users = projectUsers.map(pu => pu.users);

    return users;
  };

  public assignServicesToUser = async (projectId: number, userId: number, serviceIds: number[]) => {
    const project = await this.projectRepository.findOne(projectId);

    if (!project) {
      throw Error("Project not found");
    }

    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw Error("User not found");
    }

    const services = await this.serviceService.findByIds(serviceIds);

    if (!services.length) {
      throw Error("Services not found");
    }

    const projectUser = await this.projectUserService.getByProjectAndUser(projectId, userId);

    if (!projectUser) {
      throw Error("ProjectUser not found");
    }

    const updateResult = await this.projectUserService.updateServices(projectUser.id, services)

    if (updateResult) {
      return await this.projectUserService.getById(projectUser.id);
    } else {
      throw Error('Failed to update')
    }
  }

  public getProjectServices = async (projectId: number) => {
    const project = await this.projectRepository.findOne(projectId, { relations: ['projectServices'] });

    if (!project) {
      throw Error("Project not found");
    }

    return project.projectServices;
  }
}
