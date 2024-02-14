import { getConnection } from "typeorm";
import { MeetingRoomRepository } from "../repository/meetingRoom.repository";
import { MeetingRoom } from "../database/entities/meetingRoom.entity";

export class MeetingRoomService {
  private meetingRoomRepository: MeetingRoomRepository;

  constructor() {
    this.meetingRoomRepository = getConnection("schedule").getCustomRepository(MeetingRoomRepository);
  }

  public create = async (payload: MeetingRoom) => {
    return await this.meetingRoomRepository.save(payload);
  }
}
