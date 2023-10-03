import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import AppError from '../utils/appError';
import { verifyJwt } from '../utils/jwt';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userService = new UserService();
  
  try {
    let access_token;
    const cookies = req?.headers?.cookie?.split(';')?.map((splitedCookie) => {
      const splitedCookieArray = splitedCookie.split('=');
      
      return {
        [splitedCookieArray[0].trim()]: splitedCookieArray[1].trim()
      };
    }).reduce((acc, curr) => {
      const key = Object.keys(curr)[0];
      acc[key] = curr[key];
      return acc;
    }, {});
    
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (cookies?.access_token) {
      access_token = cookies?.access_token;
    }
    
    if (!access_token) {
      return next(new AppError(401, 'You are not logged in'));
    }
    
    // Validate the access token
    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      'JWT_ACCESS_TOKEN_PUBLIC_KEY'
    );
    
    if (!decoded) {
      return next(new AppError(401, `Invalid token or user doesn't exist`));
    }
    
    // Check if the user still exist
    const user = await userService.findUserById(parseInt(decoded.sub));
    
    if (!user) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }
    
    // Add user to res.locals
    res.locals.user = user;
    
    // Add cookie to res.locals
    res.locals.cookies = cookies;
    
    next();
  } catch (err: any) {
    next(err);
  }
};
