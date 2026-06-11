import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Task 45: Add default admin user account
  // Password hash is for "admin123"
  const adminEmail = 'admin@uptime.local';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: '$2a$12$c5hKjXU1k8R.YIuK7fN09e3Kox6p/7U8D9P/3H5y7jQ2a5T2W2K.m', // bcrypt hash for 'admin123'
        role: 'ADMIN',
      }
    });
    console.log('Admin user seeded: admin@uptime.local / admin123');
  }

  // Task 46: Seed default monitor configurations
  const defaultMonitors = [
    {
      name: 'Google Public DNS',
      type: 'PING',
      target: '8.8.8.8',
      interval: 60,
      status: 'UP',
      isActive: true,
      averageLatency: 12.5,
    },
    {
      name: 'GitHub Website',
      type: 'HTTP',
      target: 'https://github.com',
      interval: 60,
      status: 'UP',
      isActive: true,
      averageLatency: 145.2,
    },
    {
      name: 'Local API Server',
      type: 'TCP',
      target: 'localhost:5000',
      interval: 30,
      status: 'UP',
      isActive: true,
      averageLatency: 1.8,
    }
  ];

  for (const m of defaultMonitors) {
    const existingMonitor = await prisma.monitor.findFirst({
      where: { target: m.target }
    });

    if (!existingMonitor) {
      const monitor = await prisma.monitor.create({
        data: {
          name: m.name,
          type: m.type,
          target: m.target,
          interval: m.interval,
          status: m.status,
          isActive: m.isActive,
          averageLatency: m.averageLatency,
          lastChecked: new Date(),
        }
      });
      console.log(`Seeded monitor: ${m.name}`);

      // Task 47: Populate historical uptime logs for the last 30 days
      const logs = [];
      const now = new Date();
      for (let i = 30; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        
        // Occasional down state (95% uptime)
        const isUp = Math.random() > 0.05;
        const latency = isUp 
          ? m.averageLatency + (Math.random() - 0.5) * 10
          : 0;

        logs.push({
          monitorId: monitor.id,
          status: isUp,
          responseTime: latency > 0 ? latency : 0,
          statusCode: m.type === 'HTTP' ? (isUp ? 200 : 500) : null,
          errorMsg: isUp ? null : 'Service timeout / unreachable',
          timestamp: timestamp,
        });
      }

      await prisma.uptimeLog.createMany({
        data: logs
      });
      console.log(`Seeded 30 days of logs for monitor: ${m.name}`);
    }
  }

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
