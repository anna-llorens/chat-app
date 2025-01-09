import { Router } from 'express';
import { createUser, deleteUser, getUsers, loginUser } from '../controllers/user-controllers.js';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/', deleteUser)
router.post('/login', loginUser);

export default router;
