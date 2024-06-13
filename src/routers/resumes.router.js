import express from 'express';
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
import { updateResumeValidator } from '../middlewares/validators/updated-resume-validator.middleware.js';
import ResumeController from '../controllers/resumes.controller.js';

const resumesRouter = express.Router();

// 이력서 생성
resumesRouter.post(
  '/',
  createResumeValidator,
  ResumeController.createResumeController,
);

// 이력서 목록 조회
resumesRouter.get('/', ResumeController.getResumesController);

// 이력서 상세 조회
resumesRouter.get('/:id', ResumeController.getResumeController);

// 이력서 수정
resumesRouter.put(
  '/:id',
  updateResumeValidator,
  ResumeController.updateResumeController,
);

// 이력서 삭제
resumesRouter.delete('/:id', ResumeController.deleteResumeController);

export { resumesRouter };
