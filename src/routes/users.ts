import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();
const userController = new UserController();

// Existing routes
router.get('/', userController.getAllUsers);
router.get('/:user_id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:user_id', userController.updateUser);
router.post('/login', userController.login);

export default router;