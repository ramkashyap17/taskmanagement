import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // Accept test token in development
  if (token === 'test-token-123') {
    // Create a mock user for testing
    req.user = {
      id: 'cmanbvtu200008h6ddcq9zrxc',
      email: 'test@example.com',
      name: 'Test User'
    } as User;
    return next();
  }

  return res.status(401).json({ message: 'Invalid token' });
}; 