import { getConnection } from "typeorm";
import { Project } from "../database/entities/project.entity";
import { ProjectRepository } from "../repository/project.repository";
import { ServiceService } from "./service.service";
import { Service } from "../database/entities/service.entity";

export class ProjectService {
  private projectService: ProjectRepository;
  private serviceService: ServiceService;

  constructor() {
    this.projectService =
      getConnection("schedule").getCustomRepository(ProjectRepository);
    this.serviceService = new ServiceService()
  }

  public index = async () => {
    return await this.projectService.find({
      order: {
        id: "ASC",
      },
    });
  };

  public findProjectById = async (id: number) => {
    return await this.projectService.findOne({ id });
  }

  public create = async (project: Project) => {
    const services = [];
    const serviceIds = project.projectServices.map((ps: Service) => ps.id);
    for (const serviceId of serviceIds) {
      const service = await this.serviceService.findServiceById(serviceId);
      services.push(service);
    }

    project.projectServices = services as Service[];

    return await this.projectService.save(project);
  };

  public update = async (id: number, project: Partial<Project>, serviceIds: number[] = []) => {
    const services = [];
    for (const serviceId of serviceIds) {
      const service = await this.serviceService.findServiceById(serviceId);
      services.push(service);
    }

    project.projectServices = [...project.projectServices as Service[], ...services as Service[]]

    const updateResult = await this.projectService.update(id, project);

    if (updateResult) {
      const updatedProject = await this.findProjectById(id);
      return updatedProject;
    }
    return undefined;
  };

  public delete = async (id: number) => {
    return await this.projectService.delete(id);
  };
}
