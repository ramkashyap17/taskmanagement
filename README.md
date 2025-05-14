# Task Management Application

A full-stack task management application built with Next.js, Express, and Prisma.

## Project Structure

```
.
├── frontend/          # Next.js frontend application
├── backend/          # Express.js backend server
└── prisma/          # Database schema and migrations
```

## Features

- User authentication and authorization
- Create, read, update, and delete boards
- Create, read, update, and delete tasks
- Task status management (Todo, In Progress, Done)
- Task priority levels (Low, Medium, High)
- Real-time updates
- Responsive design

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Styled Components
- React Context for state management

### Backend
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-management.git
cd task-management
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:

Create `.env` files in both frontend and backend directories:

Frontend (.env):
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Backend (.env):
```
DATABASE_URL="postgresql://username:password@localhost:5432/task_management"
JWT_SECRET="your-jwt-secret"
PORT=3001
```

4. Set up the database:
```bash
cd backend
npx prisma migrate dev
```

5. Start the development servers:

```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## API Documentation

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Boards
- GET /api/boards - Get all boards
- POST /api/boards - Create a new board
- PUT /api/boards/:id - Update a board
- DELETE /api/boards/:id - Delete a board

### Tasks
- GET /api/tasks/boards/:boardId/tasks - Get all tasks for a board
- POST /api/tasks/boards/:boardId/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

- All API endpoints are protected with JWT authentication
- Passwords are hashed using bcrypt
- Environment variables are used for sensitive data
- CORS is properly configured
- Input validation is implemented on both frontend and backend

## Support

For support, email your-email@example.com or open an issue in the repository. 