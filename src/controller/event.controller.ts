import { Response, Request, NextFunction } from "express";
import { EventService } from "../services/event.service";
import { EVENT_ALLOW_FIELDS } from "../constants/Event.constant";
import { UserService } from "../services/user.service";
import { User } from "../database/entities/user.entity"; // import service

export class EventController {
  private eventService: EventService;
  private userService: UserService;

  constructor(){
    this.eventService = new EventService();
    this.userService = new UserService();
  }

  public index = async (req: Request, res: Response) => {
    try {
      const from = req.query.from as string;
      const to = req.query.to as string;
      const calendars = req.query.calendars as string;
      // const user = res['locals']['user'] as User;
      const projectId = req.query.projectId;
      const user = await this.userService.findUserById(parseInt(res.locals.user.id as string));
      const events = await this.eventService.index(Number(projectId), { from, to, calendars }, user?.id);

      return res.status(200).json({ status: 200, data: { events } })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.findUserById(parseInt(res.locals.user.id as string));
      const event = {} as any;
      for (const f in req.body) {
        if (EVENT_ALLOW_FIELDS.indexOf(f) !== -1) {
          event[f] = req.body[f];
        }
      }

      const newEvent = await this.eventService.create(event, user!);
      return res.json({ status: 200, data: { event: newEvent } })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public update = async (req: Request, res: Response) => {
    try {
      let event = {} as any;
      for (const f in req.body) {
        if (EVENT_ALLOW_FIELDS.indexOf(f) !== -1) event[f] = req.body[f];
      }
      const id =  req['params']['id'];
      const mode = req['body']['recurring_update_mode'];
      const date = req['body']['recurring_update_date'];
      const updatedEvent = await this.eventService.update(event, Number(id), mode, date);
      return res.status(200).json({ ...event, id })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id =  req['params']['id'];
      await this.eventService.delete(Number(id))
      return res.status(200).json({ success: true })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
