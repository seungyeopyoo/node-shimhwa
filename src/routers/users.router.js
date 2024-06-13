import express from 'express';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import UserController from '../controllers/users.controller.js';

const usersRouter = express.Router();

// 내정보조회 API
usersRouter.get('/me', requireAccessToken, UserController.getMeController);

export { usersRouter };
