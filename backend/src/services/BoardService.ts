import { prisma } from '../lib/prisma';
import { Board } from '../models/Board';
import { BoardData } from '../types';

export class BoardService {
  async findAll(userId: string) {
    const boards = await prisma.board.findMany({
      where: { userId },
      include: { tasks: true }
    });
    return boards.map(board => new Board(board));
  }

  async findById(id: string, userId: string) {
    const board = await prisma.board.findUnique({
      where: { 
        id,
        userId 
      },
      include: { tasks: true }
    });
    return board ? new Board(board) : null;
  }

  async create(data: Pick<BoardData, 'title' | 'description' | 'userId'>) {
    const board = await prisma.board.create({
      data: {
        title: data.title,
        description: data.description,
        userId: data.userId
      }
    });
    return new Board(board);
  }

  async update(id: string, userId: string, data: Pick<BoardData, 'title' | 'description'>) {
    const board = await prisma.board.update({
      where: { 
        id,
        userId 
      },
      data: {
        title: data.title,
        description: data.description
      }
    });
    return new Board(board);
  }

  async delete(id: string, userId: string) {
    await prisma.board.delete({
      where: { 
        id,
        userId 
      }
    });
  }

  async findTasks(boardId: string) {
    const tasks = await prisma.task.findMany({
      where: { boardId }
    });
    return tasks;
  }
} 