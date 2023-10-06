import { EntityRepository, Repository } from "typeorm";
import { Project } from "../database/entities/project.entity";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {

}
