import { Router } from 'express';
import { BoardController } from '../controllers/BoardController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const boardController = new BoardController();

router.use(authMiddleware);

router.get('/', boardController.getAllBoards);
router.get('/:id', boardController.getBoardById);
router.post('/', boardController.createBoard);
router.put('/:id', boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);
router.get('/:id/tasks', boardController.getBoardTasks);

export const boardRoutes = router; 