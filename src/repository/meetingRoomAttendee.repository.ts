import { EntityRepository, Repository } from "typeorm";
import { MeetingRoomAttendee } from "../database/entities/meetingRoomAttendee.entity";

@EntityRepository(MeetingRoomAttendee)
export class MeetingRoomAttendeeRepository extends Repository<MeetingRoomAttendee> {

}
