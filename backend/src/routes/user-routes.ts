import { Router } from 'express';
import { createUser, deleteUser, editUser, getUsers, loginUser, recentChats } from '../controllers/user-controllers.js';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);
router.get('/:id/recent-chats', recentChats);
router.put('/:id', editUser);
router.post('/login', loginUser);

export default router;
