import { Router, Response, Request } from "express";
import { User } from "../database/entities/user.entity";
import {deserializeUser} from "../middleware/deserializeUser";

export class UserController {
  public router: Router;
  
  constructor(){
    this.router = Router();
    this.routes();
  }
  
  public me = async (req: Request, res: Response) => {
    const user = res['locals']['user'] as User;
    const { password, ...rest } = user;
    res.send(rest).json();
  }
  
  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('/me', deserializeUser, this.me);
  }
}
