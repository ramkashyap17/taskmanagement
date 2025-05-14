'use client';

import styled from 'styled-components';

export const Card = styled.div`
  background-color: #2c2c37;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
  color: white;

  h3 {
    color: white;
    margin-bottom: 8px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  p {
    color: #a0a0a0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`; 