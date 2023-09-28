import { Router, Response, Request, NextFunction, CookieOptions } from "express";
import config from "config";
import { UserService } from "../services/user.service";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import AppError from "../utils/appError";
import { User } from "../database/entities/user.entity";
import redisClient from "../utils/connectRedis";
import { signJwt, verifyJwt } from "../utils/jwt"; // import service

export class AuthController {
  public router: Router;
  private userService: UserService;
  
  constructor() {
    this.userService = new UserService(); // Create a new instance of UserController
    this.router = Router();
    this.routes();
  }
  
  private cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
  };
  
  private accessTokenCookieOptions: CookieOptions = {
    ...this.cookiesOptions,
    expires: new Date(
      Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  };
  
  private refreshTokenCookieOptions: CookieOptions = {
    ...this.cookiesOptions,
    expires: new Date(
      Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
  };
  
  public register = async (req: Request, res: Response) => {
    const { name, password, email } = req['body'];
    
    const newUser = await this.userService.create({ email: email.toLowerCase(), name, password });
    if (newUser) {
      res.json({message: 'success'})
    } else {
      res.json({message: 'failed'})
    }
  }
  
  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req['body'];
    const user = await this.userService.findUserByEmail(email);
    
    if (!user) {
      return next(new AppError(400, 'Invalid email or password'));
    }
    
    if (!(await User.comparePasswords(password, user.password))) {
      return next(new AppError(400, 'Invalid email or password'));
    }
    
    const { access_token, refresh_token } = await this.userService.signTokens(user);
    
    res.cookie('access_token', access_token, this.accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, this.refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...this.accessTokenCookieOptions,
      httpOnly: false,
    });
    
    res.status(200).json({
      status: 'success',
      access_token,
    });
  }
  
  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res['locals']['user'];
      
      await redisClient.del(`${user.id}`);
      
      res.cookie('access_token', '', { maxAge: 1 });
      res.cookie('refresh_token', '', { maxAge: 1 });
      res.cookie('logged_in', '', { maxAge: 1 });
      
      res.status(200).json({
        status: 'success',
      });
    } catch (e) {
      next(e);
    }
  }
  
  public refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req['cookies']['refresh_token'];
      const message = 'Could not refresh access token';
      
      if (!refresh_token) {
        return next(new AppError(403, message));
      }
      
      const decoded = verifyJwt<{ sub: string }>(
        refresh_token,
        'refreshTokenPublicKey'
      );
      
      if (!decoded) {
        return next(new AppError(403, message));
      }
      
      const session = await redisClient.get(decoded.sub);
      
      if (!session) {
        return next(new AppError(403, message));
      }
      
      const user = await this.userService.findUserById(JSON.parse(session).id);
      
      if (!user) {
        return next(new AppError(403, message));
      }
      
      const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
        expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
      });
      
      res.cookie('access_token', access_token, this.accessTokenCookieOptions);
      res.cookie('logged_in', true, {
        ...this.accessTokenCookieOptions,
        httpOnly: false,
      });
      
      res.status(200).json({
        status: 'success',
        access_token,
      });
    } catch (err: any) {
      next(err);
    }
  }
  
  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.post('/register', validate(createUserSchema),this.register);
    this.router.post('/login', validate(loginUserSchema), this.login);
    this.router.get('/logout', deserializeUser, requireUser, this.logout);
    this.router.get('/refresh', this.refresh);
  }
}
