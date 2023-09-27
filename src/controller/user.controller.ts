import { Router, Response, Request } from "express";
import { User } from "../database/entities/user.entity";
import { UserService } from "../services/user.service"; // import service

export class UserController {
  public router: Router;
  private userService: UserService;
  
  constructor(){
    this.userService = new UserService(); // Create a new instance of UserController
    this.router = Router();
    this.routes();
  }
  
  public index = async (req: Request, res: Response) => {
    const users = await this.userService.index();
    res.send(users).json();
  }
  
  public create = async (req: Request, res: Response) => {
    const user = req['body'] as User;
    const newUser = await this.userService.create(user);
    res.send(newUser);
  }
  
  public update = async (req: Request, res: Response) => {
    const user = req['body'] as User;
    const id =  req['params']['id'];
    
    res.send(this.userService.update(user, Number(id)));
  }
  
  public delete = async (req: Request, res: Response) => {
    const id =  req['params']['id'];
    res.send(this.userService.delete(Number(id)));
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
