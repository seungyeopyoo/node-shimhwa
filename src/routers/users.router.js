import express from 'express';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { getMeController } from '../controllers/users.controller.js';

//내정보조회 API
const usersRouter = express.Router();

usersRouter.get('/me', requireAccessToken, getMeController);

export { usersRouter };
