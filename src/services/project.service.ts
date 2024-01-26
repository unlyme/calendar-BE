import { Between, getConnection } from "typeorm";
import { Project } from "../database/entities/project.entity";
import { ProjectRepository } from "../repository/project.repository";
import { ServiceService } from "./service.service";
import { Service } from "../database/entities/service.entity";
import { ProjectUserService } from "./projectUser.service";
import { UserService } from "./user.service";
import dayjs from "dayjs";
import { ProjectServiceUnitService } from "./projectServiceUnit.service";
import { EventService } from "./event.service";
import { CalendarService } from "./calendar.service";
import { CALENDAR_TEXT } from "../database/enums/calendar.enum";
import Calendar from "../database/entities/calendar.entity";
import { UserRepository } from "../repository/user.repository";

export class ProjectService {
  private projectRepository: ProjectRepository;
  private serviceService: ServiceService;
  private projectUserService: ProjectUserService;
  private userRepository: UserRepository;
  private projectServiceUnitService: ProjectServiceUnitService;
  private eventService: EventService;
  private calendarService: CalendarService;

  constructor() {
    this.projectRepository =
      getConnection("schedule").getCustomRepository(ProjectRepository);
    this.userRepository =
      getConnection("schedule").getCustomRepository(UserRepository);
    this.serviceService = new ServiceService();
    this.projectUserService = new ProjectUserService();
    this.projectServiceUnitService = new ProjectServiceUnitService();
    this.eventService = new EventService();
    this.calendarService = new CalendarService();
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
      relations: ["users"],
      order: {
        id: "ASC",
      },
      skip: skip,
      take: take,
    });
  };

  public findProjectById = async (id: number) => {
    return await this.projectRepository.findOne({ id });
  };

  public create = async (project: Partial<Project>, serviceIds: number[]) => {
    const newProject = await this.projectRepository.save(project);

    for (const serviceId of serviceIds) {
      const service = await this.serviceService.findServiceById(serviceId);
      if (service) {
        await this.projectServiceUnitService.create({
          projectId: newProject.id,
          serviceId: service.id,
        });
      }
    }

    // create default Calendar for project
    const defaultCalendars = [
      {
        text: "Birthday",
        color: "#D2FB9E",
      },
      {
        text: "Holidays",
        color: "#F68896",
      },
      {
        text: "Personal",
        color: "#61AEE6",
      },
    ];

    for (const calendar of defaultCalendars) {
      const payload = {
        projectId: newProject.id,
        text: calendar.text,
        color: calendar.color,
        active: true,
      };

      await this.calendarService.create(payload as Calendar);
    }

    return newProject;
  };

  public update = async (
    id: number,
    project: Partial<Project>,
    serviceIds: number[] = []
  ) => {
    const updateResult = await this.projectRepository.update(id, project);

    if (updateResult) {
      const updatedProject = await this.projectRepository.findOne(
        { id },
        { relations: ["users"] }
      );

      for (const serviceId of serviceIds) {
        const service = await this.serviceService.findServiceById(serviceId);
        if (service) {
          await this.projectServiceUnitService.create({
            projectId: updatedProject!.id,
            serviceId: service.id,
          });

          const projectUsers = await this.projectUserService.getByProject(id);

          for (const projectUser of projectUsers) {
            const services = [...projectUser.services, service];
            await this.projectUserService.updateServices(
              projectUser.id,
              services
            );
          }
        }
      }

      return updatedProject;
    }
    return undefined;
  };

  public delete = async (id: number) => {
    const projectUsers = await this.projectUserService.getByProject(id);

    for (const pu of projectUsers) {
      await this.projectUserService.delete(pu.id);
    }

    const projectServices = await this.projectServiceUnitService.getByProjectId(
      id
    );

    for (const ps of projectServices) {
      await this.projectServiceUnitService.delete(ps.id);
    }

    const projectEvents = await this.eventService.index(id, {});

    for (const pe of projectEvents) {
      await this.eventService.delete(pe.id);
    }

    const projectCalendars = await this.calendarService.index(id);

    for (const pc of projectCalendars) {
      await this.calendarService.delete(pc.id);
    }

    return await this.projectRepository.delete(id);
  };

  public assginUser = async (projectId: number, userId: number) => {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw Error("User not found");
    }

    const project = await this.projectRepository.findOne(projectId);

    if (!project) {
      throw Error("Project not found");
    }

    // Currently, assign all project services to user
    const projectServices = await this.projectServiceUnitService.getByProjectId(
      project.id
    );

    let services: Service[] = projectServices.map((ps) => ps.service);

    return await this.projectUserService.create({
      projectId: projectId,
      userId: userId,
      services: services,
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
    return projectUsers;
  };

  public assignServicesToUser = async (
    projectId: number,
    userId: number,
    serviceIds: number[]
  ) => {
    const project = await this.projectRepository.findOne(projectId);

    if (!project) {
      throw Error("Project not found");
    }

    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw Error("User not found");
    }

    const services = await this.serviceService.findByIds(serviceIds);

    if (!services.length) {
      throw Error("Services not found");
    }

    const projectUser = await this.projectUserService.getByProjectAndUser(
      projectId,
      userId
    );

    if (!projectUser) {
      throw Error("ProjectUser not found");
    }

    const updateResult = await this.projectUserService.updateServices(
      projectUser.id,
      services
    );

    if (updateResult) {
      return await this.projectUserService.getById(projectUser.id);
    } else {
      throw Error("Failed to update");
    }
  };

  public getProjectServices = async (projectId: number) => {
    const project = await this.projectRepository.findOne(projectId, {
      relations: ["services"],
    });

    if (!project) {
      throw Error("Project not found");
    }
    const projectServiceUnits =
      await this.projectServiceUnitService.getByProjectId(project.id);
    const services = projectServiceUnits?.map((psu) => ({
      ...psu,
      name: psu.service.name,
    }));

    return services;
  };
}
