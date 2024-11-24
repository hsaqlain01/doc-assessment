import { config } from './src/config/env';
import app from './src/app';
import { connectDB } from './src/config/db';

// Start server
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(config.app.port, () => {
      console.log(`Server running on port ${config.app.port}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();
