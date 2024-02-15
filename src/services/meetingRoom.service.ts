import { getConnection } from "typeorm";
import { MeetingRoomRepository } from "../repository/meetingRoom.repository";
import { MeetingRoom } from "../database/entities/meetingRoom.entity";
import { UserRepository } from "../repository/user.repository";
import { MeetingRoomAttendeeRepository } from "../repository/meetingRoomAttendee.repository";

export class MeetingRoomService {
  private meetingRoomRepository: MeetingRoomRepository;
  private userRepository: UserRepository;
  private meetingRoomAttendeeRepository: MeetingRoomAttendeeRepository;

  constructor() {
    this.meetingRoomRepository = getConnection("schedule").getCustomRepository(MeetingRoomRepository);
    this.userRepository = getConnection("schedule").getCustomRepository(UserRepository);
    this.meetingRoomAttendeeRepository = getConnection("schedule").getCustomRepository(MeetingRoomAttendeeRepository);
  }

  public create = async (payload: MeetingRoom) => {
    const attendeeIds = payload.attendees;

    payload.attendees = [];

    const newMeetRoom = await this.meetingRoomRepository.save(
      payload
    );
    const attendees = await this.userRepository.findByIds(attendeeIds);

    for (const attendee of attendees) {
      await this.meetingRoomAttendeeRepository.save(
        this.meetingRoomAttendeeRepository.create({
          meetingRoomId: newMeetRoom.id,
          attendeeId: attendee.id
        })
      )
    }

    const meetRoom = await this.meetingRoomRepository.findOne(newMeetRoom.id, {
      relations: ['attendees']
    });

    return meetRoom;
  }
}
