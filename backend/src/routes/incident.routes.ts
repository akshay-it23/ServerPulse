import { Router } from 'express';
import { getIncidents, resolveIncident } from '../controllers/incident.controller.js';

const router = Router();

router.get('/', getIncidents);
router.put('/:id/resolve', resolveIncident);

export default router;
