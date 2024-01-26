import { getConnection, MoreThanOrEqual, Not, In } from "typeorm";
import Event from "../database/entities/event.entity";
import { EventRepository } from "../repository/event.repository";
import { RECURRING_UPDATE_MODE } from "../database/enums/event.enum";
import { User } from "../database/entities/user.entity";

export class EventService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository =
      getConnection("schedule").getCustomRepository(EventRepository);
  }

  public index = async (
    projectId: number | undefined,
    payload: {
      from?: string,
      to?: string,
      calendars?: string,
    },
    userId?: number | undefined,
  ) => {
    if (payload.from && payload.to) {
      return await this.eventRepository
        .createQueryBuilder("event")
        .where("event.projectId = :projectId", { projectId })
        .where("event.userId = :userId", { userId })
        .andWhere("event.start_date < :to", { to: payload.to })
        .andWhere(
          '(event.end_date >= :from OR event.series_end_date >= :from OR (event.recurring <> "" AND event.series_end_date = ""))',
          { from: payload.from }
        )
        .andWhere("event.recurring <> :empty", { empty: "" })
        .orderBy("event.start_date", "ASC")
        .getMany();
    }

    if (payload.calendars) {
      const calendarIds = payload.calendars.split(',').map(id => parseInt(id));

      return await this.eventRepository.find({
        where: {
          projectId: projectId,
          userId: userId,
          calendarId: In(calendarIds),
        },
        relations: ['calendar'],
        order: { startDate: 'ASC' }
      })
    }

    return await this.eventRepository.find({
      where: {
        projectId: projectId,
        userId: userId,
      },
      relations: ['calendar'],
      order: { startDate: 'ASC' }
    })
  };

  public create = async (event: Partial<Event>, user: User) => {
    return await this.eventRepository.save(
      this.eventRepository.create({ ...event, user })
    );
  };

  public update = async (
    event: Event,
    id: number,
    mode: RECURRING_UPDATE_MODE,
    date: string | undefined
  ) => {
    const updatedEvent = await this.eventRepository.update({ id }, event);

    if (mode === "all") {
      // remove all sub-events
      await this.eventRepository.delete({ originId: id });
    } else if (mode === "next") {
      // remove all sub-events after new 'this and next' group
      if (!date) {
        throw new Error("date must be provided");
      } else {
        // in case update came for a subevent, search the master event
        const data = await this.eventRepository.find({
          id,
          originId: Not(0),
        });
        if (data.length) {
          id = data[0].originId;
        }
        await this.eventRepository.delete({
          originId: id,
          startDate: MoreThanOrEqual(date),
        });
      }
    }

    return updatedEvent;
  };

  public delete = async (id: number) => {
    const result = await this.eventRepository.delete(id);
    await this.eventRepository.delete({ originId: id });

    return result;
  };
}
