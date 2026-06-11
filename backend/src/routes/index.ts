import { Router } from 'express';
import authRoutes from './auth.routes.js';
import monitorRoutes from './monitor.routes.js';
import incidentRoutes from './incident.routes.js';
import statsRoutes from './stats.routes.js';

const apiRouter = Router();

// Task 78: Setup routing prefixes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/monitors', monitorRoutes);
apiRouter.use('/incidents', incidentRoutes);
apiRouter.use('/stats', statsRoutes);

export default apiRouter;
