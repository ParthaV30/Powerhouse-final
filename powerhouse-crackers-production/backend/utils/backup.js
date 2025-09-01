const fs = require('fs').promises;
const path = require('path');
const moment = require('moment');
const { execSync } = require('child_process');

async function createBackup() {
  try {
    const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
    const backupDir = path.join(__dirname, '..', 'backups', timestamp);

    // Create backup directory
    await fs.mkdir(backupDir, { recursive: true });

    // Backup orders
    const ordersDir = path.join(__dirname, 'data', 'orders');
    const backupOrdersDir = path.join(backupDir, 'orders');
    await fs.mkdir(backupOrdersDir, { recursive: true });

    // Copy all order files
    const orderFiles = await fs.readdir(ordersDir);
    for (const file of orderFiles) {
      if (file.endsWith('.json')) {
        const source = path.join(ordersDir, file);
        const destination = path.join(backupOrdersDir, file);
        await fs.copyFile(source, destination);
      }
    }

    // Create backup info
    const backupInfo = {
      timestamp: new Date().toISOString(),
      orderCount: orderFiles.filter(f => f.endsWith('.json')).length,
      version: '1.0.0',
      environment: process.env.NODE_ENV
    };

    await fs.writeFile(
      path.join(backupDir, 'backup-info.json'),
      JSON.stringify(backupInfo, null, 2)
    );

    // Create tar archive
    const archiveName = `powerhouse-backup-${timestamp}.tar.gz`;
    const archivePath = path.join(__dirname, '..', 'backups', archiveName);

    execSync(`cd "${path.dirname(backupDir)}" && tar -czf "${archivePath}" "${path.basename(backupDir)}"`);

    // Remove uncompressed backup directory
    execSync(`rm -rf "${backupDir}"`);

    console.log(`✅ Backup created: ${archiveName}`);
    console.log(`📦 Orders backed up: ${backupInfo.orderCount}`);

    return archivePath;
  } catch (error) {
    console.error('❌ Backup failed:', error);
    throw error;
  }
}

// Run backup if called directly
if (require.main === module) {
  createBackup().catch(console.error);
}

module.exports = { createBackup };
