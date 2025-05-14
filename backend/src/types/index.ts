// User Types
export interface UserData {
  id?: string;
  email: string;
  password: string;
  name: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserResponse extends Omit<UserData, 'password'> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Board Types
export interface BoardData {
  id?: string;
  title: string;
  description: string | null;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BoardResponse extends Omit<BoardData, 'id'> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Task Types
export const TaskStatus = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
} as const;

export const TaskPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];
export type TaskPriorityType = typeof TaskPriority[keyof typeof TaskPriority];

export interface TaskData {
  id?: string;
  title: string;
  description: string | null;
  status?: TaskStatusType;
  priority?: TaskPriorityType;
  boardId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskResponse extends Omit<TaskData, 'id'> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
} 