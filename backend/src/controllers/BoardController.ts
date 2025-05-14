import { Request, Response } from 'express';
import { BoardService } from '../services/BoardService';
import { BoardData } from '../types';
import { User } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export class BoardController {
  private boardService: BoardService;

  constructor() {
    this.boardService = new BoardService();
  }

  getAllBoards = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const boards = await this.boardService.findAll(userId);
      res.json(boards);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch boards' });
    }
  };

  getBoardById = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const board = await this.boardService.findById(req.params.id, userId);
      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }
      res.json(board);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch board' });
    }
  };

  createBoard = async (req: Request, res: Response) => {
    try {
      console.log('Received board creation request:', {
        body: req.body,
        user: req.user
      });

      const { name } = req.body;
      const userId = req.user?.id;
      
      if (!name) {
        return res.status(400).json({ message: 'Board name is required' });
      }
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const boardData = { 
        title: name,
        description: '',
        userId
      };
      console.log('Creating board with data:', boardData);

      const board = await this.boardService.create(boardData);
      console.log('Board created successfully:', board);
      
      res.status(201).json(board);
    } catch (error) {
      console.error('Error creating board:', {
        error,
        stack: error instanceof Error ? error.stack : undefined
      });
      res.status(500).json({ 
        message: 'Failed to create board',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  updateBoard = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { title, description } = req.body as Pick<BoardData, 'title' | 'description'>;
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const board = await this.boardService.update(req.params.id, userId, { title, description });
      res.json(board);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update board' });
    }
  };

  deleteBoard = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      await this.boardService.delete(req.params.id, userId);
      res.json({ message: 'Board deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete board' });
    }
  };

  getBoardTasks = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const tasks = await this.boardService.findTasks(id);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch board tasks' });
    }
  };
} 