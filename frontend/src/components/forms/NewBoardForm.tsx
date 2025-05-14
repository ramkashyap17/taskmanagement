'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { useBoard } from '../../contexts/BoardContext';

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

interface NewBoardFormProps {
  onClose: () => void;
  onSubmit?: (data: { name: string }) => Promise<void>;
  initialData?: { name: string };
}

export const NewBoardForm = ({ onClose, onSubmit, initialData }: NewBoardFormProps) => {
  const [name, setName] = useState(initialData?.name || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addBoard } = useBoard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit({ name });
      } else {
        await addBoard({ name });
      }
      onClose();
    } catch (error) {
      console.error('Failed to save board:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Board Name</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter board name"
          required
          disabled={isSubmitting}
        />
      </FormGroup>
      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {initialData ? 'Update Board' : 'Create Board'}
      </Button>
    </Form>
  );
}; 