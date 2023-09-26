import { EntityRepository, Repository } from "typeorm";
import Calendar from "../database/entities/calendar.entity";

@EntityRepository(Calendar)
export class CalendarRepository extends Repository<Calendar> {

}
