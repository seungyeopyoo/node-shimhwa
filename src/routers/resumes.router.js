import express from 'express';
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
import { updateResumeValidator } from '../middlewares/validators/updated-resume-validator.middleware.js';
import {
  createResumeController,
  getResumesController,
  getResumeController,
  updateResumeController,
  deleteResumeController,
} from '../controllers/resumes.controller.js';

const resumesRouter = express.Router();

// 이력서 생성
resumesRouter.post('/', createResumeValidator, createResumeController);

// 이력서 목록 조회
resumesRouter.get('/', getResumesController);

// 이력서 상세 조회
resumesRouter.get('/:id', getResumeController);

// 이력서 수정
resumesRouter.put('/:id', updateResumeValidator, updateResumeController);

// 이력서 삭제
resumesRouter.delete('/:id', deleteResumeController);

export { resumesRouter };
