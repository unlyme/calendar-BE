import { EntityRepository, Repository } from "typeorm";
import { Admin } from "../database/entities/admin.entity";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  // Add custom repository functions here
}
