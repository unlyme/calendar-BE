import { Response, Request } from "express";
import { NotificationService } from "../services/notification.service";
import { User } from "../database/entities/user.entity";
import Notification from "../database/entities/notification.entity";

export class NotificationController {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  public listByUser = async (_req: Request, res: Response) => {
    try {
      const user = res['locals']['user'] as User;
      const notifications = await this.notificationService.listByUser(user.id);
      return res.status(200).json({ notifications });
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const payload = req['body'] as Notification;
      const user = res['locals']['user'] as User;
      payload.user = user;
      const newNote = await this.notificationService.create(payload);
      return res.status(200).json({ note: newNote });
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
