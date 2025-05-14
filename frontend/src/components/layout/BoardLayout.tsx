'use client';

import styled from 'styled-components';
import { Button } from '../common/Button';
import { TaskColumn } from '../board/TaskColumn';
import { Sidebar } from './Sidebar';
import { Task, TaskStatusType } from '../../types';
import { useState } from 'react';
import { useBoard } from '../../contexts/BoardContext';
import { Modal } from '../common/Modal';
import { NewTaskForm } from '../forms/NewTaskForm';
import { BoardMenu } from '../BoardMenu';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #24242f;
  position: relative;
`;

const Content = styled.div`
  flex: 1;
  background-color: #24242f;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  margin-left: 280px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c2c37;
  padding: 24px;
  border-right: 1px solid #3e3f4e;
  border-bottom: 1px solid #3e3f4e;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const BoardTitle = styled.h1`
  color: white;
  margin: 0;
  font-size: clamp(1.2rem, 4vw, 1.5rem);
`;

const ColumnsWrapper = styled.div`
  padding: 24px;
  overflow-x: auto;
  flex: 1;
  width: 100%;
`;

const ColumnsContainer = styled.div`
  display: flex;
  gap: 24px;
  padding: 0 8px;
  min-width: min-content;
  width: max-content;
`;

const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Dummy tasks data with proper Date objects
const dummyTasks: Task[] = [
  {
    id: '1',
    title: 'Design System',
    description: 'Create a design system for the application',
    status: 'TODO',
    priority: 'HIGH',
    boardId: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'API Integration',
    description: 'Integrate backend APIs',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    boardId: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Testing',
    description: 'Write unit tests',
    status: 'DONE',
    priority: 'LOW',
    boardId: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Update TaskColumn props interface
interface TaskColumnProps {
  title?: string;
  status?: TaskStatusType;
  tasks: Task[];
  isNewColumn?: boolean;
}

export const BoardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const { currentBoard } = useBoard();

  return (
    <Container>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <SidebarOverlay 
        $isOpen={isSidebarOpen} 
        onClick={() => setIsSidebarOpen(false)} 
      />
      <Content>
        <Header>
          <HeaderLeft>
            <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              ☰
            </MenuButton>
            <BoardTitle>{currentBoard?.title || 'Select a Board'}</BoardTitle>
          </HeaderLeft>
          <HeaderRight>
            {currentBoard && <BoardMenu board={currentBoard} />}
            <Button 
              variant="primary" 
              onClick={() => setIsNewTaskModalOpen(true)}
            >
              + Add new task
            </Button>
          </HeaderRight>
        </Header>
        <ColumnsWrapper>
          <ColumnsContainer>
            <TaskColumn title="Todo" status="TODO" tasks={currentBoard?.tasks || []} />
            <TaskColumn title="In Progress" status="IN_PROGRESS" tasks={currentBoard?.tasks || []} />
            <TaskColumn title="Done" status="DONE" tasks={currentBoard?.tasks || []} />
            <TaskColumn isNewColumn tasks={[]} title="" status="TODO" />
          </ColumnsContainer>
        </ColumnsWrapper>
      </Content>

      <Modal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        title="Create New Task"
      >
        <NewTaskForm onClose={() => setIsNewTaskModalOpen(false)} />
      </Modal>
    </Container>
  );
}; 