import { EntityRepository, Repository } from "typeorm";
import { MeetingRoom } from "../database/entities/meetingRoom.entity";

@EntityRepository(MeetingRoom)
export class MeetingRoomRepository extends Repository<MeetingRoom> {

}
