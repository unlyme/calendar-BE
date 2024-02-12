import { In, getConnection } from "typeorm";
import Calendar from "../database/entities/calendar.entity";
import { CalendarRepository } from "../repository/calendar.repository";
import { EventRepository } from "../repository/event.repository";
import { CALENDAR_TEXT } from "../database/enums/calendar.enum";

export class CalendarService {
  private calendarRepository: CalendarRepository;
  private eventRepository: EventRepository;

  constructor() {
    this.calendarRepository =
      getConnection("schedule").getCustomRepository(CalendarRepository);
    this.eventRepository =
      getConnection("schedule").getCustomRepository(EventRepository);
  }

  public index = async (projectId: number) => {
    const sharedCalendars = await this.calendarRepository.find({
      where: {
        projectId: null,
      },
      order: {
        id: "ASC",
      },
    });

    const projectCalendars = await this.calendarRepository.find({
      where: {
        projectId: projectId,
      },
      order: {
        id: "ASC",
      },
    });

    return [...sharedCalendars, ...projectCalendars];
  };

  public create = async (calendar: Calendar) => {
    return await this.calendarRepository.save(calendar);
  };

  public update = async (calendar: Calendar, id: number) => {
    const res = await this.calendarRepository.update(id, calendar);

    const events = await this.eventRepository.find({
      where: {
        calendarId: id,
      },
    });

    const eventIds = events.map((e) => e.id);

    await this.eventRepository.update(
      {
        id: In(eventIds),
      },
      {
        color: calendar.color,
      }
    );

    return res;
  };

  public delete = async (id: number) => {
    const events = await this.eventRepository.find({
      where: {
        calendarId: id,
      },
    });

    const eventIds = events.map((e) => e.id);

    await this.eventRepository.delete({
      id: In(eventIds),
    });

    const res = await this.calendarRepository.delete(id);
    return res;
  };

  public transfer = async (id: number) => {
    const events = await this.eventRepository.find({
      where: {
        calendarId: id,
      },
    });

    const eventIds = events.map((e) => e.id);
    const transferCalendar = await this.calendarRepository.findOne({
      text: CALENDAR_TEXT.PERSONAL
    });

    await this.eventRepository.update(
      {
        id: In(eventIds),
      },
      {
        calendarId: transferCalendar?.id
      }
    )

    return true;
  }
}
