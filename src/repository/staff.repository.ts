import { EntityRepository, Repository } from "typeorm";
import { Staff } from "../database/entities/staff.entity";

@EntityRepository(Staff)
export class StaffRepository extends Repository<Staff> {
  // Add custom repository functions here
}
