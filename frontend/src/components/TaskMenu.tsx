'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useBoard } from '../contexts/BoardContext';
import { Modal } from './common/Modal';
import { NewTaskForm } from './forms/NewTaskForm';
import { Task, TaskStatusType, TaskPriorityType } from '../types';

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #7c808c;
  cursor: pointer;
  padding: 4px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #fff;
  }
`;

const MenuContainer = styled.div`
  position: relative;
`;

const MenuDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #2c2c38;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: 1000;
  min-width: 150px;
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 8px 16px;
  text-align: left;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #3c3c4a;
  }
`;

interface TaskMenuProps {
  task: Task;
}

export const TaskMenu = ({ task }: TaskMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { updateTask, deleteTask } = useBoard();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUpdate = async (data: {
    title: string;
    description: string;
    status: TaskStatusType;
    priority: TaskPriorityType;
  }) => {
    try {
      await updateTask(task.id, data);
      setShowUpdateModal(false);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
        setIsOpen(false);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  return (
    <MenuContainer ref={menuRef}>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        ⋮
      </MenuButton>
      <MenuDropdown $isOpen={isOpen}>
        <MenuItem onClick={() => {
          setShowUpdateModal(true);
          setIsOpen(false);
        }}>
          Update
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          Delete
        </MenuItem>
      </MenuDropdown>
      <Modal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        title="Update Task"
      >
        <NewTaskForm
          onClose={() => setShowUpdateModal(false)}
          onSubmit={handleUpdate}
          initialData={task}
        />
      </Modal>
    </MenuContainer>
  );
}; 