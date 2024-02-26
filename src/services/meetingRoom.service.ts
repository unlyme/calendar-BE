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
    this.meetingRoomRepository = getConnection("schedule").getCustomRepository(
      MeetingRoomRepository
    );
    this.userRepository =
      getConnection("schedule").getCustomRepository(UserRepository);
    this.meetingRoomAttendeeRepository = getConnection(
      "schedule"
    ).getCustomRepository(MeetingRoomAttendeeRepository);
  }

  public index = async (
    userId: number,
    filter: {
      from?: string;
      to?: string;
      projectId?: number;
    }
  ) => {
    const query = this.meetingRoomAttendeeRepository
      .createQueryBuilder("meeting_room_attendees")
      .where("meeting_room_attendees.attendee_id = :userId", { userId });

    const meetingRoomAttendees = await query.select(['id', 'meeting_room_id']).getMany();
    const ids = meetingRoomAttendees.map(mra => mra.meetingRoomId);

    const mQuery = this.meetingRoomRepository.createQueryBuilder("meeting_rooms").whereInIds(ids);

    if (filter.projectId) {
      mQuery.where("meeting_rooms.project_id = :projectId", {
        projectId: filter.projectId,
      });
    }
    if (filter.from) {
      mQuery.where("meeting_rooms.start_at >= :from", { from: filter.from });
    }
    if (filter.to) {
      mQuery.where("meeting_rooms.start_at < :to", { to: filter.to });
    }

    const meetingRooms = await mQuery
      .orderBy("meeting_rooms.start_at", "DESC")
      .getMany();

    return meetingRooms;
  };

  public create = async (payload: MeetingRoom) => {
    const attendeeIds = payload.attendees;

    payload.attendees = [];

    const newMeetRoom = await this.meetingRoomRepository.save(
      this.meetingRoomRepository.create(payload)
    );

    const attendees = await this.userRepository.findByIds(attendeeIds);

    for (const attendee of attendees) {
      await this.meetingRoomAttendeeRepository.save(
        this.meetingRoomAttendeeRepository.create({
          meetingRoomId: newMeetRoom.id,
          attendeeId: attendee.id,
        })
      );
    }

    const meetRoom = await this.meetingRoomRepository.findOne(newMeetRoom.id, {
      relations: ["attendees"],
    });

    return meetRoom;
  };

  public getMeetingRoomByRoomUid = async (roomUid: string) => {
    const room = await this.meetingRoomRepository.findOne({
      roomUid: roomUid,
    });

    return room;
  };

  public verifyPassword = async (roomId: number, password: string) => {
    const room = await this.meetingRoomRepository.findOne(roomId);
    const boolFlag = await MeetingRoom.comparePasswords(
      password,
      room?.password!
    );
    return boolFlag;
  };
}
