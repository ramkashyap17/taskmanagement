import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { UserData } from '../types';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  register = async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body as Pick<UserData, 'email' | 'password' | 'name'>;
      
      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const user = await this.userService.create({ email, password, name });
      const token = jwt.sign({ userId: user.id }, config.jwt.secret, { expiresIn: '24h' });
      
      res.status(201).json({ user: user.toJSON(), token });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body as Pick<UserData, 'email' | 'password'>;
      
      const user = await this.userService.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValid = await this.userService.validatePassword(user, password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, config.jwt.secret, { expiresIn: '24h' });
      res.json({ user: user.toJSON(), token });
    } catch (error) {
      res.status(500).json({ error: 'Failed to login' });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.findAll();
      res.json(users.map(user => user.toJSON()));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user.toJSON());
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.update(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user.toJSON());
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.userService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };
} 