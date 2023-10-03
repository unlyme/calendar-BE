import { Response, Request } from "express";
import Calendar from "../database/entities/calendar.entity";
import { CalendarService } from "../services/calendar.service"; // import service

export class CalendarController {
  private calendarService: CalendarService;

  constructor(){
    this.calendarService = new CalendarService(); // Create a new instance of CalendarController
  }

  public index = async (req: Request, res: Response) => {
    const calendars = await this.calendarService.index();
    res.send(calendars).json();
  }

  public create = async (req: Request, res: Response) => {
    const calendar = req['body'] as Calendar;
    const newCalendar = await this.calendarService.create(calendar);
    res.send(newCalendar);
  }

  public update = async (req: Request, res: Response) => {
    const calendar = req['body'] as Calendar;
    const id =  req['params']['id'];
    const updatedCalendar = await this.calendarService.update(calendar, Number(id));
    if (updatedCalendar) {
      res.send({...calendar, id});
    } else {
      res.send({ failed: true })
    }
  }

  public delete = async (req: Request, res: Response) => {
    const id =  req['params']['id'];
    res.send(this.calendarService.delete(Number(id)));
  }
}
