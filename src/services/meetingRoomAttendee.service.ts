import { getConnection } from "typeorm";
import { MeetingRoomAttendeeRepository } from "../repository/meetingRoomAttendee.repository";
import { MeetingRoomAttendee } from "../database/entities/meetingRoomAttendee.entity";

export class MeetingRoomAttendeeService {
  private meetingRoomAttendeeRepository: MeetingRoomAttendeeRepository;

  constructor() {
    this.meetingRoomAttendeeRepository = getConnection("schedule").getCustomRepository(MeetingRoomAttendeeRepository);
  }

  public create = async (record: Partial<MeetingRoomAttendee>) => {
    return await this.meetingRoomAttendeeRepository.save(
      this.meetingRoomAttendeeRepository.create(record)
    );
  };
}
