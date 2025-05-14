'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useBoard } from '@/contexts/BoardContext';
import { NewTaskForm } from './forms/NewTaskForm';
import { Modal } from './common/Modal';
import { BoardMenu } from './BoardMenu';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Button = styled.button`
  background-color: #635fc7;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #7c7af6;
  }
`;

export const BoardHeader = () => {
  const { currentBoard } = useBoard();
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  if (!currentBoard) return null;

  return (
    <Header>
      <Title>{currentBoard.title}</Title>
      <Actions>
        <BoardMenu board={currentBoard} />
        <Button onClick={() => setIsNewTaskModalOpen(true)}>
          Add New Task
        </Button>
      </Actions>

      {isNewTaskModalOpen && (
        <Modal
          isOpen={isNewTaskModalOpen}
          onClose={() => setIsNewTaskModalOpen(false)}
          title="Create New Task"
        >
          <NewTaskForm onClose={() => setIsNewTaskModalOpen(false)} />
        </Modal>
      )}
    </Header>
  );
}; 