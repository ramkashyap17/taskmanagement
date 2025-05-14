'use client';

import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
  size?: 'small' | 'medium' | 'large';
  $fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: ${({ size }) => {
    switch (size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  border-radius: 9999px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  transition: all 0.2s ease;
  color: white;

  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: #464b57;
          color: white;
          &:hover {
            background-color: #525865;
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          border: 2px solid #645fc7;
          color: white;
          &:hover {
            background-color: #645fc7;
          }
        `;
      case 'link':
        return `
          background-color: transparent;
          color: #645fc7;
          padding: 8px 0;
          &:hover {
            color: #7b76d9;
          }
        `;
      default:
        return `
          background-color: #645fc7;
          color: white;
          &:hover {
            background-color: #7b76d9;
          }
        `;
    }
  }}
`; 