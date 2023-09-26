import { EntityRepository, Repository } from "typeorm";
import Unit from "../database/entities/unit.entity";

@EntityRepository(Unit)
export class UnitRepository extends Repository<Unit> {

}
