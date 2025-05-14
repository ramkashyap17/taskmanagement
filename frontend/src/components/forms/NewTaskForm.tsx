'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { useBoard } from '../../contexts/BoardContext';
import { Task, TaskPriorityType, TaskStatusType } from '../../types';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: white;
  font-size: 0.875rem;
`;

const Input = styled.input`
  background-color: #23232e;
  border: 1px solid #3e3f4e;
  border-radius: 4px;
  padding: 12px;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #645fc7;
  }
`;

const TextArea = styled.textarea`
  background-color: #23232e;
  border: 1px solid #3e3f4e;
  border-radius: 4px;
  padding: 12px;
  color: white;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #645fc7;
  }
`;

const Select = styled.select`
  background-color: #23232e;
  border: 1px solid #3e3f4e;
  border-radius: 4px;
  padding: 12px;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #645fc7;
  }
`;

interface NewTaskFormProps {
  onClose: () => void;
  onSubmit?: (data: {
    title: string;
    description: string;
    status: TaskStatusType;
    priority: TaskPriorityType;
  }) => Promise<void>;
  initialData?: Task;
}

export const NewTaskForm = ({ onClose, onSubmit, initialData }: NewTaskFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState<TaskStatusType>(initialData?.status || 'TODO');
  const [priority, setPriority] = useState<TaskPriorityType>(initialData?.priority || 'MEDIUM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTask } = useBoard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit({
          title,
          description,
          status,
          priority
        });
      } else {
        await addTask({
          title,
          description,
          status,
          priority
        });
      }
      onClose();
    } catch (error) {
      console.error('Failed to save task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Title</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          required
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup>
        <Label>Status</Label>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatusType)}
          required
          disabled={isSubmitting}
        >
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Priority</Label>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriorityType)}
          required
          disabled={isSubmitting}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </Select>
      </FormGroup>
      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {initialData ? 'Update Task' : 'Create Task'}
      </Button>
    </Form>
  );
}; 