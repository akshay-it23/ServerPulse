import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger.js';

// Global Prisma Client instance
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Task 52: Implement clean disconnection of Prisma Client on server shutdown
export async function disconnectDB() {
  try {
    await prisma.$disconnect();
    logger.info('Prisma Client disconnected successfully');
  } catch (error) {
    logger.error('Error disconnecting Prisma Client:', error);
  }
}
