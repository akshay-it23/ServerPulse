import { Request, Response } from 'express';
import { asyncHandler } from '../utils/errors.js';

// Task 79: Auth Controllers Shell
export const login = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented: auth.login' });
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented: auth.register' });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented: auth.getMe' });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented: auth.logout' });
});
