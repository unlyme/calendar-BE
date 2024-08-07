import { In, getConnection } from "typeorm";
import { MeetingRoomRepository } from "../repository/meetingRoom.repository";
import { FRECENCY, MeetingRoom } from "../database/entities/meetingRoom.entity";
import { UserRepository } from "../repository/user.repository";
import { MeetingRoomAttendeeRepository } from "../repository/meetingRoomAttendee.repository";
import dayjs from "dayjs";
import { orderBy, uniq, uniqBy } from "lodash";
import { EventRepository } from "../repository/event.repository";

export class MeetingRoomService {
  private meetingRoomRepository: MeetingRoomRepository;
  private userRepository: UserRepository;
  private meetingRoomAttendeeRepository: MeetingRoomAttendeeRepository;
  private eventRepository: EventRepository;

  constructor() {
    this.meetingRoomRepository = getConnection("schedule").getCustomRepository(
      MeetingRoomRepository
    );
    this.userRepository =
      getConnection("schedule").getCustomRepository(UserRepository);
    this.meetingRoomAttendeeRepository = getConnection(
      "schedule"
    ).getCustomRepository(MeetingRoomAttendeeRepository);
    this.eventRepository =
      getConnection("schedule").getCustomRepository(EventRepository);
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

  public getHistory = async (
    userId: number,
    filter: {
      to?: string;
      projectId?: number;
    }
  ) => {
    const query = this.meetingRoomAttendeeRepository
      .createQueryBuilder("meeting_room_attendees")
      .where("meeting_room_attendees.attendeeId = :userId", { userId });

    const meetingRoomAttendees = await query.getMany();
    const ids = meetingRoomAttendees.map((mra) => mra.meetingRoomId);

    if (!ids.length) {
      return [];
    }

    const unarchivedRooms = await this.meetingRoomRepository
      .createQueryBuilder("meeting_rooms")
      .where("meeting_rooms.id IN (:...ids)", { ids: ids })
      .andWhere("meeting_rooms.project_id = :projectId", {
        projectId: filter.projectId,
      })
      .where("meeting_rooms.is_archived IS FALSE")
      .where("meeting_rooms.frecency = 'ONCE'")
      .getMany();

    if (unarchivedRooms.length > 0) {
      const unarchivedRoomIds = unarchivedRooms
        .filter((ur) => dayjs(ur.endAt).isBefore(dayjs()))
        .map((ur) => ur.id);
      if (unarchivedRoomIds.length) {
        await this.meetingRoomRepository.update(unarchivedRoomIds, {
          isArchived: true,
        });
      }
    }

    const rMeetingRooms = await this.meetingRoomRepository
      .createQueryBuilder("meeting_rooms")
      .where("meeting_rooms.id IN (:...ids)", { ids: ids })
      .where("meeting_rooms.project_id = :projectId", {
        projectId: filter.projectId,
      })
      .where("meeting_rooms.start_at < :to", { from: filter.to })
      .where("meeting_rooms.is_archived IS TRUE")
      .orderBy("meeting_rooms.start_at", "DESC")
      .getMany();

    const mIds = rMeetingRooms.map((r) => r.id);

    const meetingRooms = await this.meetingRoomRepository.find({
      where: {
        id: In(mIds),
        projectId: filter.projectId,
      },
      relations: ["user", "attendees"],
      order: { startAt: "DESC" },
    });

    return meetingRooms;
  };

  public getUpcoming = async (
    userId: number,
    filter: {
      from?: string;
      projectId?: number;
    }
  ) => {
    const query = this.meetingRoomAttendeeRepository
      .createQueryBuilder("meeting_room_attendees")
      .where("meeting_room_attendees.attendeeId = :userId", { userId });

    const meetingRoomAttendees = await query.getMany();
    const ids = meetingRoomAttendees.map((mra) => mra.meetingRoomId);

    if (!ids.length) {
      return [];
    }

    const rMeetingRooms = await this.meetingRoomRepository
      .createQueryBuilder("meeting_rooms")
      .where("meeting_rooms.id IN (:...ids)", { ids: ids })
      .andWhere("meeting_rooms.project_id = :projectId", {
        projectId: filter.projectId,
      })
      .andWhere("meeting_rooms.end_at >= :from", { from: filter.from })
      .andWhere("meeting_rooms.is_archived IS FALSE")
      .getMany();

    const mIds = rMeetingRooms.map((r) => r.id);

    const mMeetingRooms = await this.meetingRoomRepository.find({
      where: {
        id: In(mIds),
      },
      relations: ["user", "attendees"],
    });

    const recurringData = [];

    for (const meetingRoom of mMeetingRooms) {
      if (meetingRoom.frecency === FRECENCY.ONCE) {
        if (
          dayjs(meetingRoom.endAt).isSame(dayjs(), "date") ||
          dayjs(meetingRoom.endAt).isAfter(dayjs(), "date")
        ) {
          recurringData.push(meetingRoom);
        }
      }

      if (meetingRoom.frecency === FRECENCY.WEEKLY) {
        let startAt = meetingRoom.startAt;
        let endAt = meetingRoom.endAt;
        if (dayjs(startAt).isSame(dayjs(), "date")) {
          recurringData.push(meetingRoom);
        } else {
          const range = dayjs(startAt).diff(dayjs(), "days");
          startAt = dayjs(startAt).add(range, "day").format("DD/MM/YYYYTHH:ss");
          endAt = dayjs(endAt).add(range, "day").format("DD/MM/YYYYTHH:ss");
          recurringData.push({
            ...meetingRoom,
            startAt: startAt,
            endAt: endAt,
          });
        }

        for (let i = 1; i <= 4; i++) {
          recurringData.push({
            ...meetingRoom,
            startAt: dayjs(startAt)
              .add(7 * i, "day")
              .format(),
            endAt: meetingRoom.endAt
              ? dayjs(startAt)
                  .add(7 * i, "day")
                  .format()
              : null,
          });
        }
      }
      if (meetingRoom.frecency === FRECENCY.DAILY) {
        let startAt = meetingRoom.startAt;
        let endAt = meetingRoom.endAt;
        if (dayjs(startAt).isSame(dayjs(), "date")) {
          recurringData.push(meetingRoom);
        } else {
          const range = dayjs(startAt).diff(dayjs(), "days");
          startAt = dayjs(startAt).add(range, "day").format("DD/MM/YYYYTHH:ss");
          endAt = dayjs(endAt).add(range, "day").format("DD/MM/YYYYTHH:ss");
          recurringData.push({
            ...meetingRoom,
            startAt: startAt,
            endAt: endAt,
          });
        }

        for (let i = 1; i <= 7; i++) {
          recurringData.push({
            ...meetingRoom,
            startAt: dayjs(startAt)
              .add(1 * i, "day")
              .format(),
            endAt: meetingRoom.endAt
              ? dayjs(endAt)
                  .add(1 * i, "day")
                  .format()
              : null,
          });
        }
      }
    }

    const meetingRooms = orderBy(recurringData, "startAt", "asc");

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

  public update = async (id: number, payload: Partial<MeetingRoom>) => {
    const attendeeIds = uniq(payload.attendees);
    if (payload.attendees) {
      const attendees = await this.userRepository.findByIds(attendeeIds);
      await this.meetingRoomAttendeeRepository.delete({
        meetingRoomId: id,
      });

      for (const attendee of attendees) {
        await this.meetingRoomAttendeeRepository.save(
          this.meetingRoomAttendeeRepository.create({
            meetingRoomId: id,
            attendeeId: attendee.id,
          })
        );
      }
    }
    delete payload.attendees;

    const updateResult = await this.meetingRoomRepository.update(id, payload);

    if (updateResult) {
      const updatedMeeting = await this.meetingRoomRepository.findOne(id);
      return updatedMeeting;
    }
    return undefined;
  };

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

  public delete = async (id: number) => {
    const attendees = await this.meetingRoomAttendeeRepository.find({
      meetingRoomId: id,
    });
    const attendeeIds = attendees.map((a) => a.id);

    const meeting = await this.meetingRoomRepository.findOne(id);

    const eventRecord = await this.eventRepository.findOne({
      id: meeting?.eventId,
    });

    if (eventRecord) {
      await this.eventRepository.delete(eventRecord.id);
    }

    await this.meetingRoomAttendeeRepository.delete({
      id: In(attendeeIds),
    });

    const result = await this.meetingRoomRepository.delete(id);
    return result;
  };
}
