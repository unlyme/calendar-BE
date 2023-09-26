import { Router, Response, Request } from "express";
import Calendar from "../database/entities/calendar.entity";
import { CalendarService } from "../services/calendar.service"; // import service

export class CalendarController {
  public router: Router;
  private calendarService: CalendarService;

  constructor(){
    this.calendarService = new CalendarService(); // Create a new instance of CalendarController
    this.router = Router();
    this.routes();
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
    
    res.send(this.calendarService.update(calendar, Number(id)));
  }

  public delete = async (req: Request, res: Response) => {
    const id =  req['params']['id'];
    res.send(this.calendarService.delete(Number(id)));
  }

  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('/', this.index);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
