const { spawn } = require('child_process');
const path = require('path');

// Start the server using ts-node
const server = spawn('npx', ['ts-node', 'src/server.ts'], {
  stdio: 'inherit',
  shell: true
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
});

process.on('SIGINT', () => {
  server.kill();
  process.exit();
}); 