import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runTest() {
  console.log('--- Testing Prisma CRUD Operations ---');
  
  // Create
  const newMonitor = await prisma.monitor.create({
    data: {
      name: 'Temp Test Monitor',
      type: 'HTTP',
      target: 'http://example.com/test-endpoint',
      interval: 120,
      status: 'UP',
      isActive: true,
    }
  });
  console.log('1. Created Monitor:', newMonitor.name, `(ID: ${newMonitor.id})`);

  // Read
  const fetchedMonitor = await prisma.monitor.findUnique({
    where: { id: newMonitor.id }
  });
  console.log('2. Fetched Monitor:', fetchedMonitor?.name);

  // Update
  const updatedMonitor = await prisma.monitor.update({
    where: { id: newMonitor.id },
    data: {
      interval: 300,
      status: 'DOWN'
    }
  });
  console.log('3. Updated Monitor Interval to:', updatedMonitor.interval, 'Status to:', updatedMonitor.status);

  // Delete
  const deletedMonitor = await prisma.monitor.delete({
    where: { id: newMonitor.id }
  });
  console.log('4. Deleted Monitor:', deletedMonitor.name);

  console.log('--- Test Completed Successfully ---');
}

runTest()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
