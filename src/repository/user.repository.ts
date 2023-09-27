import { EntityRepository, Repository } from "typeorm";
import User from "../database/entities/calendar.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}
