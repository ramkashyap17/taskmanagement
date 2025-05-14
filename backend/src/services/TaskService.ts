import { prisma } from '../lib/prisma';
import { Task } from '../models/Task';
import { TaskData, TaskStatus, TaskPriority } from '../types';

export class TaskService {
  async findAll(userId: string) {
    const tasks = await prisma.task.findMany({
      where: { userId },
      include: { board: true }
    });
    return tasks.map(task => new Task(task));
  }

  async findById(id: string, userId: string) {
    const task = await prisma.task.findUnique({
      where: { 
        id,
        userId 
      },
      include: { board: true }
    });
    return task ? new Task(task) : null;
  }

  async findByBoardId(boardId: string, userId: string) {
    const tasks = await prisma.task.findMany({
      where: { 
        boardId,
        userId 
      },
      include: { board: true }
    });
    return tasks.map(task => new Task(task));
  }

  async create(data: Omit<TaskData, 'id' | 'createdAt' | 'updatedAt'>) {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status || TaskStatus.TODO,
        priority: data.priority || TaskPriority.MEDIUM,
        boardId: data.boardId,
        userId: data.userId
      }
    });
    return new Task(task);
  }

  async update(id: string, userId: string, data: Omit<TaskData, 'id' | 'createdAt' | 'updatedAt'>) {
    const task = await prisma.task.update({
      where: { 
        id,
        userId 
      },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        boardId: data.boardId
      }
    });
    return new Task(task);
  }

  async delete(id: string, userId: string) {
    await prisma.task.delete({
      where: { 
        id,
        userId 
      }
    });
  }
} 