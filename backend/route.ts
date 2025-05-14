import { NextRequest, NextResponse } from 'next/server';
import { BoardController } from './api/controllers/BoardController';
import { TaskController } from './api/controllers/TaskController';
import { BoardData, TaskData } from './types';

const boardController = new BoardController();
const taskController = new TaskController();

// Route handlers
const handleBoardRoutes = async (request: NextRequest) => {
  const { pathname } = new URL(request.url);
  
  if (pathname === '/api/boards') {
    if (request.method === 'GET') {
      return boardController.getAllBoards();
    }
    if (request.method === 'POST') {
      const body = await request.json() as Pick<BoardData, 'title' | 'description'>;
      return boardController.createBoard(body);
    }
  }
  
  const boardIdMatch = pathname.match(/^\/api\/boards\/([^/]+)$/);
  if (boardIdMatch) {
    const id = boardIdMatch[1];
    
    if (request.method === 'GET') {
      return boardController.getBoardById(id);
    }
    if (request.method === 'PUT') {
      const body = await request.json() as Pick<BoardData, 'title' | 'description'>;
      return boardController.updateBoard(id, body);
    }
    if (request.method === 'DELETE') {
      return boardController.deleteBoard(id);
    }
  }
  
  return null;
};

const handleTaskRoutes = async (request: NextRequest) => {
  const { pathname } = new URL(request.url);
  
  if (pathname === '/api/tasks') {
    if (request.method === 'GET') {
      return taskController.getAllTasks();
    }
    if (request.method === 'POST') {
      const body = await request.json() as Omit<TaskData, 'id' | 'createdAt' | 'updatedAt'>;
      return taskController.createTask(body);
    }
  }
  
  const taskIdMatch = pathname.match(/^\/api\/tasks\/([^/]+)$/);
  if (taskIdMatch) {
    const id = taskIdMatch[1];
    
    if (request.method === 'GET') {
      return taskController.getTaskById(id);
    }
    if (request.method === 'PUT') {
      const body = await request.json() as Omit<TaskData, 'id' | 'createdAt' | 'updatedAt'>;
      return taskController.updateTask(id, body);
    }
    if (request.method === 'DELETE') {
      return taskController.deleteTask(id);
    }
  }
  
  return null;
};

// Main request handler
export async function GET(request: NextRequest) {
  const response = await handleBoardRoutes(request) || await handleTaskRoutes(request);
  return response || NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function POST(request: NextRequest) {
  const response = await handleBoardRoutes(request) || await handleTaskRoutes(request);
  return response || NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(request: NextRequest) {
  const response = await handleBoardRoutes(request) || await handleTaskRoutes(request);
  return response || NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(request: NextRequest) {
  const response = await handleBoardRoutes(request) || await handleTaskRoutes(request);
  return response || NextResponse.json({ error: 'Not found' }, { status: 404 });
} 