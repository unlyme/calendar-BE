import { NextFunction, Request, Response } from 'express';

export const requireAdmin = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = res.locals.admin;

    if (!admin) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
