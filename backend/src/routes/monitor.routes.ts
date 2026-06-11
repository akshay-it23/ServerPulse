import { Router } from 'express';
import {
  getMonitors,
  getMonitorById,
  createMonitor,
  updateMonitor,
  deleteMonitor,
  getMonitorLogs,
} from '../controllers/monitor.controller.js';

const router = Router();

router.get('/', getMonitors);
router.get('/:id', getMonitorById);
router.post('/', createMonitor);
router.put('/:id', updateMonitor);
router.delete('/:id', deleteMonitor);
router.get('/:id/logs', getMonitorLogs);

export default router;
