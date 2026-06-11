import { Request, Response } from 'express';
import { asyncHandler } from '../utils/errors.js';

// Task 82: Stats Controllers Shell
export const getSummaryStats = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented: stats.getSummaryStats' });
});
