import { Router } from 'express';
import { refreshToken, signIn, signUp } from '../controllers/auth.controller';
import user from '../middlewares/user';

const router = Router();
router.post('/signin', signIn);
router.post('/signup', user, signUp);
router.post('/refreshtoken', refreshToken);

export default router;