const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../dev.db');
const backupDir = path.join(__dirname, '../backups');

if (!fs.existsSync(dbPath)) {
  console.error('Database file dev.db not found. Run migrations first!');
  process.exit(1);
}

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(backupDir, `dev-backup-${timestamp}.db`);

try {
  fs.copyFileSync(dbPath, backupPath);
  console.log(`Database backup created successfully: ${backupPath}`);
} catch (error) {
  console.error('Failed to backup database:', error);
  process.exit(1);
}
