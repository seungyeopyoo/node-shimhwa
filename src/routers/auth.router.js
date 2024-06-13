import express from 'express';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
import { signUpController } from '../controllers/auth.controller.js';
import { signInController } from '../controllers/auth.controller.js';

const authRouter = express.Router();
// // 회원가입 API
authRouter.post('/sign-up', signUpValidator, signUpController);

// 로그인 API
authRouter.post('/sign-in', signInValidator, signInController);

export { authRouter };
