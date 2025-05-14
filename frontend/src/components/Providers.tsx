'use client';

import { UserProvider } from '../contexts/UserContext';
import { BoardProvider } from '../contexts/BoardContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <BoardProvider>
        {children}
      </BoardProvider>
    </UserProvider>
  );
} 