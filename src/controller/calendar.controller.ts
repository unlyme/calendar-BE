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
    try {
      const user = res['locals']['user'] as User;
      const calendars = await this.calendarService.index(user.id);
      return res.status(200).json({ status: 200, data: { calendars } });
    } catch (error: any) {
      return res.status(400).json({ error: error });
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const calendar = req['body'] as Calendar;
      const user = res['locals']['user'] as User;
      calendar.user = user;
      const newCalendar = await this.calendarService.create(calendar);
      return res.status(200).json({ status: 200, data: { calendar: newCalendar } });
    } catch (error: any) {
      return res.status(400).json({ error: error.mesage });
    }
  }

  public update = async (req: Request, res: Response) => {
    try {
      const calendar = req['body'] as Calendar;
      const id =  req['params']['id'];
      const updatedCalendar = await this.calendarService.update(calendar, Number(id));
      if (updatedCalendar) {
        return res.status(200).json({ calendar: updatedCalendar });
      } else {
        return res.status(400).json({ error: 'Something went wrong' })
      }
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const id =  req['params']['id'];
      const deleted = await this.calendarService.delete(Number(id));
      return res.status(200).json({ deleted })
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
