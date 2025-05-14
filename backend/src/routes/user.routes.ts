import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.post('/', userController.register);
router.post('/login', userController.login);
router.get('/', userController.findAll);
router.get('/:id', userController.findById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export const userRoutes = router; 