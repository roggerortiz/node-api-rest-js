import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user.controller';
import user from '../middlewares/user';

const router = Router();
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', user, createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;