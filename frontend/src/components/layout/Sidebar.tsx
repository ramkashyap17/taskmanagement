'use client';

import styled from 'styled-components';
import { Button } from '../common/Button';
import { useBoard } from '../../contexts/BoardContext';
import { Modal } from '../common/Modal';
import { NewBoardForm } from '../forms/NewBoardForm';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  width: 280px;
  height: 100vh;
  background-color: #2c2c37;
  color: white;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #3e3f4e;
  border-bottom: 1px solid #3e3f4e;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  }
`;

const BoardList = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`;

const BoardItem = styled.div<{ $isSelected?: boolean }>`
  padding: 12px 24px;
  cursor: pointer;
  margin-bottom: 8px;
  color: white;
  border-radius: 0 24px 24px 0;
  margin-left: -24px;
  padding-left: 24px;
  width: calc(100% + 24px);
  
  ${({ $isSelected }) => $isSelected ? `
    background-color: #645fc7;
    color: white;
  ` : `
    &:hover {
      background-color: #363642;
    }
  `}
`;

const NewBoardButton = styled(Button)`
  text-align: left;
  padding: 12px 24px;
  margin-left: -24px;
  width: calc(100% + 24px);
  border-radius: 0 24px 24px 0;
  margin-bottom: 8px;
`;

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
  const { boards, currentBoard, setCurrentBoard } = useBoard();

  return (
    <SidebarContainer $isOpen={isOpen}>
      <h2>Task Management</h2>
      <BoardList>
        {boards.map(board => (
          <BoardItem 
            key={board.id}
            $isSelected={board.id === currentBoard?.id}
            onClick={() => setCurrentBoard(board)}
          >
            {board.title}
          </BoardItem>
        ))}
        <NewBoardButton 
          variant="link" 
          size="medium"
          onClick={() => setIsNewBoardModalOpen(true)}
        >
          + New Board
        </NewBoardButton>
      </BoardList>

      <Modal
        isOpen={isNewBoardModalOpen}
        onClose={() => setIsNewBoardModalOpen(false)}
        title="Create New Board"
      >
        <NewBoardForm onClose={() => setIsNewBoardModalOpen(false)} />
      </Modal>
    </SidebarContainer>
  );
}; 