import { getConnection } from "typeorm";
import { MeetingRoomRepository } from "../repository/meetingRoom.repository";
import { FRECENCY, MeetingRoom } from "../database/entities/meetingRoom.entity";
import { UserRepository } from "../repository/user.repository";
import { MeetingRoomAttendeeRepository } from "../repository/meetingRoomAttendee.repository";
import dayjs from "dayjs";
import { orderBy } from "lodash";

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
      .where("meeting_room_attendees.attendeeId = :userId", { userId });

    const meetingRoomAttendees = await query.getMany();
    const ids = meetingRoomAttendees.map((mra) => mra.meetingRoomId);

    let firstQueryStr =
      "meeting_rooms.userId = :userId AND meeting_rooms.frecency = 'ONCE'";

    if (ids.length > 0) {
      firstQueryStr = firstQueryStr + " OR meeting_rooms.id IN (:...ids)";
    }

    const mQuery = this.meetingRoomRepository
      .createQueryBuilder("meeting_rooms")
      .where(firstQueryStr, { ids: [...ids], userId: userId });
    if (filter.projectId) {
      mQuery.andWhere("meeting_rooms.project_id = :projectId", {
        projectId: filter.projectId,
      });
    }
    if (filter.from) {
      mQuery.andWhere("meeting_rooms.start_at >= :from", { from: filter.from });
    }
    if (filter.to) {
      mQuery.andWhere("meeting_rooms.start_at < :to", { to: filter.to });
    }

    const meetingRooms = await mQuery
      .orderBy("meeting_rooms.start_at", "DESC")
      .getMany();

    let secondQueryStr =
      "meeting_rooms.userId = :userId AND meeting_rooms.frecency != 'ONCE'";

    if (ids.length > 0) {
      secondQueryStr = secondQueryStr + " OR meeting_rooms.id IN (:...ids)";
    }

    const recurringQuery = this.meetingRoomRepository
      .createQueryBuilder("meeting_rooms")
      .where(secondQueryStr, { ids: [...ids], userId: userId });
    if (filter.projectId) {
      recurringQuery.andWhere("meeting_rooms.project_id = :projectId", {
        projectId: filter.projectId,
      });
    }

    const recurringMeetings = await recurringQuery
      .orderBy("meeting_rooms.start_at", "DESC")
      .getMany();

    const mRecurringMeetings = [];

    if (!filter.to) {
      for (const recurringMeeting of recurringMeetings) {
        mRecurringMeetings.push(recurringMeeting);
        if (recurringMeeting.frecency === FRECENCY.WEEKLY) {
          for (let i = 1; i <= 4; i++) {
            mRecurringMeetings.push({
              ...recurringMeeting,
              startAt: dayjs(recurringMeeting.startAt)
                .add(7 * i, "day")
                .format(),
              endAt: recurringMeeting.endAt
                ? dayjs(recurringMeeting.endAt)
                    .add(7 * i, "day")
                    .format()
                : null,
            });
          }
        }
        if (recurringMeeting.frecency === FRECENCY.DAILY) {
          for (let i = 1; i <= 7; i++) {
            mRecurringMeetings.push({
              ...recurringMeeting,
              startAt: dayjs(recurringMeeting.startAt)
                .add(1 * i, "day")
                .format(),
              endAt: recurringMeeting.endAt
                ? dayjs(recurringMeeting.endAt)
                    .add(1 * i, "day")
                    .format()
                : null,
            });
          }
        }
      }
    }
    if (!filter.from) {
      for (const recurringMeeting of recurringMeetings) {
        if (dayjs(recurringMeeting.startAt).isBefore(dayjs())) {
          if (recurringMeeting.frecency === FRECENCY.WEEKLY) {
            for (let i = 1; i <= 4; i++) {
              mRecurringMeetings.push({
                ...recurringMeeting,
                startAt: dayjs(recurringMeeting.startAt)
                  .subtract(7 * i, "day")
                  .format(),
                endAt: recurringMeeting.endAt
                  ? dayjs(recurringMeeting.endAt)
                      .subtract(7 * i, "day")
                      .format()
                  : null,
              });
            }
          }
          if (recurringMeeting.frecency === FRECENCY.DAILY) {
            for (let i = 1; i <= 7; i++) {
              mRecurringMeetings.push({
                ...recurringMeeting,
                startAt: dayjs(recurringMeeting.startAt)
                  .subtract(1 * i, "day")
                  .format(),
                endAt: recurringMeeting.endAt
                  ? dayjs(recurringMeeting.endAt)
                      .subtract(1 * i, "day")
                      .format()
                  : null,
              });
            }
          }
        }
      }
    }

    const combinned = [...meetingRooms, ...mRecurringMeetings];
    const ordered = orderBy(combinned, "startAt", "desc");

    return ordered;
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

  public update = async (id: number, payload: Partial<MeetingRoom>) => {
    const updateResult = await this.meetingRoomRepository.update(id, payload);
    if (updateResult) {
      const updatedMeeting = await this.meetingRoomRepository.findOne(id);
      return updatedMeeting;
    }
    return undefined;
  }

  public getMeetingRoomByRoomUid = async (roomUid: string) => {
    const room = await this.meetingRoomRepository.findOne({
      roomUid: roomUid,
    });

    return room;
  };

  public verifyPassword = async (roomId: number, password: string) => {
    const room = await this.meetingRoomRepository.findOne(roomId);
    const boolFlag = password === room?.password;
    return boolFlag;
  };
}
