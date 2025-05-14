import { TaskData, TaskResponse, TaskStatus, TaskPriority, TaskStatusType, TaskPriorityType } from '../types';

export class Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatusType;
  priority: TaskPriorityType;
  boardId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id || '';
    this.title = data.title;
    this.description = data.description;
    this.status = this.validateStatus(data.status);
    this.priority = this.validatePriority(data.priority);
    this.boardId = data.boardId;
    this.userId = data.userId;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  private validateStatus(status: string): TaskStatusType {
    if (Object.values(TaskStatus).includes(status as TaskStatusType)) {
      return status as TaskStatusType;
    }
    return TaskStatus.TODO;
  }

  private validatePriority(priority: string): TaskPriorityType {
    if (Object.values(TaskPriority).includes(priority as TaskPriorityType)) {
      return priority as TaskPriorityType;
    }
    return TaskPriority.MEDIUM;
  }

  toJSON(): TaskResponse {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      priority: this.priority,
      boardId: this.boardId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
} 