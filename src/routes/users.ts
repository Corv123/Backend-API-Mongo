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
router.post('/check-exists', userController.checkExists);
router.post('/:userId/verify-password', userController.verifyPassword);
router.get('/email/:email', userController.getUserByEmail);
router.put('/reset-password/:email', userController.resetPasswordByEmail);

export default router;