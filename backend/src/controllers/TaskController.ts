import { Request as ExpressRequest, Response } from 'express';
import { TaskService } from '../services/TaskService';
import { TaskData } from '../types';
import { User } from '../models/User';

// Define a custom Request type that includes the user property
interface RequestWithUser extends ExpressRequest {
  user?: User;
}

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  getAllTasks = async (req: RequestWithUser, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const tasks = await this.taskService.findAll(userId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  };

  getTaskById = async (req: RequestWithUser, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const task = await this.taskService.findById(req.params.id, userId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  };

  createTask = async (req: RequestWithUser, res: Response) => {
    try {
      console.log('Received task creation request:', {
        body: req.body,
        params: req.params,
        user: req.user
      });

      const { boardId } = req.params;
      const { title, description, status, priority } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }

      const task = await this.taskService.create({
        title,
        description,
        status,
        priority,
        boardId,
        userId
      });

      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ 
        message: 'Failed to create task',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  getBoardTasks = async (req: RequestWithUser, res: Response) => {
    try {
      const { boardId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const tasks = await this.taskService.findByBoardId(boardId, userId);
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching board tasks:', error);
      res.status(500).json({ 
        message: 'Failed to fetch board tasks',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  updateTask = async (req: RequestWithUser, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const updates = req.body;
      const task = await this.taskService.update(id, userId, updates);
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update task' });
    }
  };

  getTask = async (req: RequestWithUser, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const task = await this.taskService.findById(id, userId);
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch task' });
    }
  };

  deleteTask = async (req: RequestWithUser, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      await this.taskService.delete(req.params.id, userId);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  };
} 