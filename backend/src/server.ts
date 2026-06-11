import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { logger } from './utils/logger.js';
import { disconnectDB } from './config/db.js';
import apiRouter from './routes/index.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Task 27: Implement uncaught exception handler
process.on('uncaughtException', async (error) => {
  logger.error('Uncaught Exception thrown:', error);
  await disconnectDB();
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 5000;

// Security and utility middleware
app.use(helmet());
app.use(morgan('dev'));
// Task 86: Implement compression middleware
app.use(compression());

// Task 29: Setup CORS options to allow frontend domain access
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Task 67 & 68: Mount body parsers with limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Task 84: Mount API rate limiter
app.use('/api', apiLimiter);

// Task 70: Create base route handler
app.get('/', (req, res) => {
  res.json({
    name: 'Server Status Monitor API',
    version: '1.0.0',
    description: 'Dynamic, real-time server status monitoring full-stack backend.'
  });
});

// Task 25: Create a health check endpoint /api/health
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Mount Routes
app.use('/api/v1', apiRouter);

// Task 73: Mount global error handler
app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Graceful shutdown helper
const gracefulShutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    await disconnectDB();
    logger.info('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Task 28: Implement unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

