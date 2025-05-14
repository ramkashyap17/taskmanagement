import './globals.css';
import { BoardProvider } from '../src/contexts/BoardContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <BoardProvider>
          {children}
        </BoardProvider>
      </body>
    </html>
  );
} 