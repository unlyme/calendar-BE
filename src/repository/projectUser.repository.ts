import { EntityRepository, Repository } from "typeorm";
import { ProjectUser } from "../database/entities/projectUser.entity";

@EntityRepository(ProjectUser)
export class ProjectUserRepository extends Repository<ProjectUser> {

}
