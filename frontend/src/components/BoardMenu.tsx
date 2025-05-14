'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useBoard } from '../contexts/BoardContext';
import { Modal } from './common/Modal';
import { NewBoardForm } from './forms/NewBoardForm';
import { Board } from '../types';

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
  opacity: 0.8;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    opacity: 1;
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: currentColor;
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
  border: 1px solid #3e3f4e;
  border-radius: 4px;
  padding: 8px 0;
  min-width: 150px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 8px 16px;
  background: none;
  border: none;
  color: #fff;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const DeleteMenuItem = styled(MenuItem)`
  color: #ff4d4d;
`;

interface BoardMenuProps {
  board: Board;
}

export const BoardMenu = ({ board }: BoardMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { updateBoard, deleteBoard } = useBoard();

  const handleUpdate = async (data: { name: string }) => {
    try {
      await updateBoard(board.id, data);
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Failed to update board:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      try {
        await deleteBoard(board.id);
      } catch (error) {
        console.error('Failed to delete board:', error);
      }
    }
  };

  return (
    <MenuContainer>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </MenuButton>

      <MenuDropdown $isOpen={isOpen}>
        <MenuItem onClick={() => {
          setShowUpdateModal(true);
          setIsOpen(false);
        }}>
          Update Board
        </MenuItem>
        <DeleteMenuItem onClick={() => {
          handleDelete();
          setIsOpen(false);
        }}>
          Delete Board
        </DeleteMenuItem>
      </MenuDropdown>

      <Modal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        title="Update Board"
      >
        <NewBoardForm
          onClose={() => setShowUpdateModal(false)}
          onSubmit={handleUpdate}
          initialData={{ name: board.title }}
        />
      </Modal>
    </MenuContainer>
  );
};