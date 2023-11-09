import { EntityRepository, Repository } from "typeorm";
import { ProjectServiceUnit } from "../database/entities/projectServiceUnit.entity";

@EntityRepository(ProjectServiceUnit)
export class ProjectServiceUnitRepository extends Repository<ProjectServiceUnit> {

}
