import { Router, Response, Request } from "express";
import { User } from "../database/entities/user.entity";
import {deserializeUser} from "../middleware/deserializeUser";

export class UserController {
  public router: Router;

  constructor(){
    this.router = Router();
    this.routes();
  }

  public me = async (_req: Request, res: Response) => {
    try {
      const user = res['locals']['user'] as User;
      const { password, ...rest } = user;
      return res.status(200).json({ user })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('/me', deserializeUser, this.me);
  }
}
