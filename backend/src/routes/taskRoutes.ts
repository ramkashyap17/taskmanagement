import express from 'express';
import { TaskController } from '../controllers/TaskController';

const router = express.Router();
const taskController = new TaskController();

router.post('/', taskController.createTask);
router.patch('/:taskId', taskController.updateTask);
router.get('/:taskId', taskController.getTask);

export const taskRoutes = router; 