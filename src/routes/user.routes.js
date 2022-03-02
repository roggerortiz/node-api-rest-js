import { Router } from 'express';
import validateUser from '../middlewares/user';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user.controller';

const router = Router();
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', validateUser, createUser);
router.put('/:id', validateUser, updateUser);
router.delete('/:id', deleteUser);

export default router;