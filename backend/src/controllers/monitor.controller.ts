import { Request, Response } from 'express';
import { asyncHandler } from '../utils/errors.js';

// Task 80: Monitors Controllers Shell
export const getMonitors = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented: monitor.getMonitors' });
});

export const getMonitorById = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented: monitor.getMonitorById' });
});

export const createMonitor = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented: monitor.createMonitor' });
});

export const updateMonitor = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented: monitor.updateMonitor' });
});

export const deleteMonitor = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented: monitor.deleteMonitor' });
});

export const getMonitorLogs = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented: monitor.getMonitorLogs' });
});
