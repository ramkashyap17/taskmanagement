'use client';

import styled from 'styled-components';
import { Task, TaskStatusType } from '../../types';
import { Button } from '../common/Button';
import { TaskCard } from '../TaskCard';

interface TaskColumnProps {
  title?: string;
  status?: TaskStatusType;
  tasks: Task[];
  isNewColumn?: boolean;
}

const ColumnContainer = styled.div<{ $isNewColumn?: boolean }>`
  width: ${({ $isNewColumn }) => $isNewColumn ? '350px' : '280px'};
  min-width: ${({ $isNewColumn }) => $isNewColumn ? '350px' : '280px'};
  padding: 16px;
  margin: 0 8px;
  min-height: 500px;
  background-color: ${({ $isNewColumn }) => $isNewColumn ? '#23232e' : 'transparent'};

  @media (max-width: 768px) {
    width: ${({ $isNewColumn }) => $isNewColumn ? '300px' : '240px'};
    min-width: ${({ $isNewColumn }) => $isNewColumn ? '300px' : '240px'};
  }
`;

const ColumnHeader = styled.div`
  font-weight: 600;
  margin-bottom: 16px;
  color: #464b57;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskCount = styled.span`
  background-color: #464b57;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.875rem;
  color: white;
`;

const NewColumnButton = styled(Button)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7c808c;
  font-size: 1.1rem;
  background-color: transparent;
  padding: 0;
  margin-top: 48px;

  &:hover {
    color: #7c808c;
  }
`;

export const TaskColumn = ({ title, status, tasks, isNewColumn }: TaskColumnProps) => {
  const filteredTasks = isNewColumn ? [] : tasks.filter(task => task.status === status);

  if (isNewColumn) {
    return (
      <ColumnContainer $isNewColumn>
        <NewColumnButton variant="link">
          + New Column
        </NewColumnButton>
      </ColumnContainer>
    );
  }

  return (
    <ColumnContainer>
      <ColumnHeader>
        <span>{title}</span>
        <TaskCount>{filteredTasks.length}</TaskCount>
      </ColumnHeader>
      {filteredTasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ColumnContainer>
  );
}; 