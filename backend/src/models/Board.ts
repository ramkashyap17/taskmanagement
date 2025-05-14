import { BoardData, BoardResponse } from '../types';

export class Board {
  id: string;
  title: string;
  description: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: BoardData) {
    this.id = data.id || '';
    this.title = data.title;
    this.description = data.description;
    this.userId = data.userId;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON(): BoardResponse {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
} 