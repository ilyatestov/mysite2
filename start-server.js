#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// Проверка доступности порта
function checkPort(port) {
  return new Promise((resolve) => {
    const net = require('net');
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        resolve(true);
      }
    });
    
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    
    server.listen(port);
  });
}

async function startServer() {
  console.log('Checking available ports...');
  
  // Проверяем порты начиная с 3001
  for (let port = 3001; port <= 3100; port++) {
    const isAvailable = await checkPort(port);
    if (isAvailable) {
      console.log(`Starting server on port ${port}...`);
      process.env.PORT = port;
      
      try {
        // Запускаем сервер
        const { stdout, stderr } = await execAsync('node src/server.js');
        console.log('Server output:');
        console.log(stdout);
        if (stderr) {
          console.error('Server errors:');
          console.error(stderr);
        }
      } catch (error) {
        console.error('Error starting server:', error.message);
      }
      return;
    }
  }
  
  console.log('No available ports found between 3001-3100');
}

startServer().catch(console.error);