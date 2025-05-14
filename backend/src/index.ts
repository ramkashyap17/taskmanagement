import express from 'express';
import cors from 'cors';
import { boardRoutes } from './routes/board.routes';
import { taskRoutes } from './routes/task.routes';
import { userRoutes } from './routes/user.routes';
import { config } from './config';

const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: '*',  // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],  // Add Authorization header
  credentials: true
}));
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    headers: req.headers,
    body: req.body
  });
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Task Management API',
    endpoints: {
      users: '/api/users',
      boards: '/api/boards',
      tasks: '/api/tasks'
    }
  });
});

// Routes
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 