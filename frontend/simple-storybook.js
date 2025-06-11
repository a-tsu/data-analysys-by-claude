const { execSync } = require('child_process');

try {
  console.log('Starting Storybook...');
  execSync('node_modules/.bin/storybook dev -p 6006 --host 0.0.0.0', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
} catch (error) {
  console.error('Error starting Storybook:', error.message);
  
  // Try alternative path
  try {
    console.log('Trying npx...');
    execSync('npx storybook dev -p 6006 --host 0.0.0.0', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
  } catch (err) {
    console.error('npx also failed:', err.message);
  }
}