import { Router, Response, Request } from "express";
import { EventService } from "../services/event.service";
import { EVENT_ALLOW_FIELDS } from "../constants/Event.constant";
import {deserializeUser} from "../middleware/deserializeUser";
import {UserService} from "../services/user.service"; // import service

export class EventController {
  public router: Router;
  private eventService: EventService;
  private userService: UserService;

  constructor(){
    this.eventService = new EventService();
    this.userService = new UserService();
    this.router = Router();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const from = req.query.from as string;
    const to = req.query.to as string;
    const events = await this.eventService.index(from, to);
    res.send(events).json();
  }

  public create = async (req: Request, res: Response) => {
    const user = await this.userService.findUserById(parseInt(res.locals.user.id as string));
    const event = {} as any;
    for (const f in req.body) {
      if (EVENT_ALLOW_FIELDS.indexOf(f) !== -1) {
        event[f] = req.body[f];
      }
    }
    const newEvent = await this.eventService.create(event, user!);
    res.send(newEvent);
  }

  public update = async (req: Request, res: Response) => {
    let event = {} as any;
    for (const f in req.body) {
      if (EVENT_ALLOW_FIELDS.indexOf(f) !== -1) event[f] = req.body[f];
    }
    const id =  req['params']['id'];
    const mode = req['body']['recurring_update_mode'];
    const date = req['body']['recurring_update_date'];
    
    res.send(this.eventService.update(event, Number(id), mode, date));
  }

  public delete = async (req: Request, res: Response) => {
    const id =  req['params']['id'];
    res.send(this.eventService.delete(Number(id)));
  }

  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('/', this.index);
    this.router.post('/', deserializeUser, this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
