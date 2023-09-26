import { EntityRepository, Repository } from "typeorm";
import Event from "../database/entities/event.entity";

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {

}
