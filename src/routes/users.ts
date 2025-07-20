import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();
const userController = new UserController();

// Existing routes
router.get('/', userController.getAllUsers);
router.get('/all', userController.getAllUsers);
router.get('/:user_id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:user_id', userController.updateUser);
router.delete('/:user_id', userController.deleteUser);
router.post('/login', userController.login);

// ✅ New dedicated update routes
router.put('/:user_id/update-username', userController.updateUsername);
router.put('/:user_id/update-password', userController.updatePassword);
router.put('/:user_id/update-email', userController.updateEmail);
router.put('/:user_id/update-mobile', userController.updateMobile);

export default router;