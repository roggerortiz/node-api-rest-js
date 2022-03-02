import { Router } from 'express';
import validateUser from '../middlewares/user';
import { refreshToken, signIn, signUp } from '../controllers/auth.controller';

const router = Router();
router.post('/signin', signIn);
router.post('/signup', validateUser, signUp);
router.post('/refreshtoken', refreshToken);

export default router;