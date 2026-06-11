import { Request, Response } from 'express';
import { asyncHandler } from '../utils/errors.js';

// Task 81: Incidents Controllers Shell
export const getIncidents = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented: incident.getIncidents' });
});

export const resolveIncident = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented: incident.resolveIncident' });
});
