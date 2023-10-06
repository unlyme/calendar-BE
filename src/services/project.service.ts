import { getConnection } from "typeorm";
import { Project } from "../database/entities/project.entity";
import { ProjectRepository } from "../repository/project.repository";

export class ProjectService {
  private projectSerivce: ProjectRepository;

  constructor() {
    this.projectSerivce =
      getConnection("schedule").getCustomRepository(ProjectRepository);
  }

  public index = async () => {
    return await this.projectSerivce.find({
      order: {
        id: "ASC",
      },
    });
  };

  public create = async (project: Project) => {
    return await this.projectSerivce.save(project);
  };

  public update = async (id: number, project: Partial<Project>) => {
    return await this.projectSerivce.update(id, project);
  };

  public delete = async (id: number) => {
    return await this.projectSerivce.delete(id);
  };
}
