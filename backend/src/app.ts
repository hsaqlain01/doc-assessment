import express, { ErrorRequestHandler, Express } from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error';
import documentRoutes from './routes/document.routes';
import userRoutes from './routes/user.routes';
import homeRoutes from './routes/index';
import { AppError } from './utils/errors';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/documents', documentRoutes);
app.use('/api/users', userRoutes);
app.use('/api', homeRoutes);

// 404 handler
app.use((_req, _res, next) => {
  next(new AppError('Route not found', 404));
});

// Error handling middleware (must be last)
app.use(errorHandler as ErrorRequestHandler);

export default app;
