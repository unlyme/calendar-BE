import { Router, Response, Request } from "express";
import { User } from "../database/entities/user.entity";

export class UserController {
  public router: Router;
  
  constructor(){
    this.router = Router();
    this.routes();
  }
  
  public me = async (req: Request, res: Response) => {
    const user = res['locals']['user'] as User;
    res.send(user).json();
  }
  
  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('/me', this.me);
  }
}
