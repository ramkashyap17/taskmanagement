'use client';

import styled from 'styled-components';
import { Task } from '@/types';
import { TaskMenu } from './TaskMenu';

interface TaskCardProps {
  task: Task;
}

const Card = styled.div`
  background-color: #2c2c38;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin: 0;
`;

const SubTaskCount = styled.div`
  font-size: 0.75rem;
  color: #a0a0a0;
  margin-top: 4px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #8c8c96;
  margin-bottom: 12px;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Status = styled.span<{ status: string }>`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'TODO':
        return '#ff6b6b';
      case 'IN_PROGRESS':
        return '#ffd93d';
      case 'DONE':
        return '#6bff6b';
      default:
        return '#8c8c96';
    }
  }};
  color: #fff;
`;

const Priority = styled.span<{ priority: string }>`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ priority }) => {
    switch (priority) {
      case 'HIGH':
        return '#ff6b6b';
      case 'MEDIUM':
        return '#ffd93d';
      case 'LOW':
        return '#6bff6b';
      default:
        return '#8c8c96';
    }
  }};
  color: #fff;
`;

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <TaskMenu task={task} />
      </CardHeader>
      <SubTaskCount>0 of 3 subtasks</SubTaskCount>
      <Description>{task.description}</Description>
      <Meta>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Status status={task.status}>{task.status}</Status>
          <Priority priority={task.priority}>{task.priority}</Priority>
        </div>
      </Meta>
    </Card>
  );
}; 