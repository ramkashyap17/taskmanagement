'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task, TaskStatusType, Board } from '../types';
import { api } from '../services/api';

// Hardcoded test user ID
const TEST_USER_ID = 'cmanbvtu200008h6ddcq9zrxc';

interface BoardContextType {
  currentBoard: Board | null;
  boards: Board[];
  setCurrentBoard: (board: Board | null) => void;
  addBoard: (board: { name: string }) => Promise<void>;
  updateBoard: (boardId: string, data: { name: string }) => Promise<void>;
  deleteBoard: (boardId: string) => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'boardId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch boards on mount
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await api.getBoards();
        // Map the response to include tasks array
        const boardsWithTasks = data.map((board: any) => ({
          ...board,
          tasks: []
        }));
        setBoards(boardsWithTasks);
        if (boardsWithTasks.length > 0) {
          setCurrentBoard(boardsWithTasks[0]);
        }
      } catch (err) {
        setError('Failed to fetch boards');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoards();
  }, []);

  // Fetch tasks when current board changes
  useEffect(() => {
    const fetchTasks = async () => {
      if (!currentBoard) return;
      try {
        const tasks = await api.getTasks(currentBoard.id);
        setCurrentBoard(prev => prev ? { ...prev, tasks } : null);
      } catch (err) {
        setError('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, [currentBoard?.id]);

  const addBoard = async (boardData: { name: string }) => {
    try {
      const newBoard = await api.createBoard({
        ...boardData,
        userId: TEST_USER_ID
      });
      setBoards(prev => [...prev, newBoard]);
      setCurrentBoard(newBoard);
    } catch (err) {
      setError('Failed to create board');
      throw err;
    }
  };

  const updateBoard = async (boardId: string, data: { name: string }) => {
    try {
      const updatedBoard = await api.updateBoard(boardId, data);
      setBoards(prev => prev.map(board => 
        board.id === boardId ? { ...board, ...updatedBoard } : board
      ));
      if (currentBoard?.id === boardId) {
        setCurrentBoard(prev => prev ? { ...prev, ...updatedBoard } : null);
      }
    } catch (err) {
      setError('Failed to update board');
      throw err;
    }
  };

  const deleteBoard = async (boardId: string) => {
    try {
      await api.deleteBoard(boardId);
      setBoards(prev => prev.filter(board => board.id !== boardId));
      if (currentBoard?.id === boardId) {
        setCurrentBoard(boards.find(board => board.id !== boardId) || null);
      }
    } catch (err) {
      setError('Failed to delete board');
      throw err;
    }
  };

  const addTask = async (taskData: Omit<Task, 'id' | 'boardId' | 'createdAt' | 'updatedAt'>) => {
    if (!currentBoard) return;
    try {
      const newTask = await api.createTask(currentBoard.id, {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority
      });
      setCurrentBoard(prev => prev ? { ...prev, tasks: [...prev.tasks, newTask] } : null);
    } catch (err) {
      setError('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    if (!currentBoard) return;
    try {
      const updatedTask = await api.updateTask(taskId, updates);
      setCurrentBoard(prev => {
        if (!prev) return null;
        return {
          ...prev,
          tasks: prev.tasks.map(task =>
            task.id === taskId ? { ...task, ...updatedTask } : task
          )
        };
      });
    } catch (err) {
      setError('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!currentBoard) return;
    try {
      await api.deleteTask(taskId);
      setCurrentBoard(prev => {
        if (!prev) return null;
        return {
          ...prev,
          tasks: prev.tasks.filter(task => task.id !== taskId)
        };
      });
    } catch (err) {
      setError('Failed to delete task');
      throw err;
    }
  };

  return (
    <BoardContext.Provider value={{
      currentBoard,
      boards,
      setCurrentBoard,
      addBoard,
      updateBoard,
      deleteBoard,
      addTask,
      updateTask,
      deleteTask,
      isLoading,
      error
    }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
}; 