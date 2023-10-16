import { Response, Request } from "express";
import Calendar from "../database/entities/calendar.entity";
import { CalendarService } from "../services/calendar.service"; // import service
import { User } from "../database/entities/user.entity";

export class CalendarController {
  private calendarService: CalendarService;

  constructor(){
    this.calendarService = new CalendarService(); // Create a new instance of CalendarController
  }

  public index = async (_req: Request, res: Response) => {
    const user = res['locals']['user'] as User;
    const calendars = await this.calendarService.index(user.id);
    return res.json({ status: 200, data: { calendars } });
  }

  public create = async (req: Request, res: Response) => {
    const calendar = req['body'] as Calendar;
    const user = res['locals']['user'] as User;
    calendar.user = user;
    const newCalendar = await this.calendarService.create(calendar);
    return res.json({ status: 200, data: { calendar: newCalendar } });
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
