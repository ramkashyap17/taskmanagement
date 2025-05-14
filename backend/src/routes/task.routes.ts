import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const taskController = new TaskController();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Board-specific task routes
router.post('/boards/:boardId/tasks', taskController.createTask);
router.get('/boards/:boardId/tasks', taskController.getBoardTasks);

// General task routes
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export const taskRoutes = router; 