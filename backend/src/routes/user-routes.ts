import { Router } from 'express';
import { createUser, deleteUser, editUser, getUsers, loginUser } from '../controllers/user-controllers.js';
import { recentChats } from '../controllers/chat-controller.js';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);
router.get('/:id/recent-chats', recentChats);
router.put('/:id', editUser);
router.post('/login', loginUser);

export default router;
