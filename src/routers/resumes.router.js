import express from 'express';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
import { prisma } from '../utils/prisma.util.js';
import { updateResumeValidator } from '../middlewares/validators/updated-resume-validator.middleware.js';
import {
  createResumeController,
  getResumesController,
  getResumeController,
  updateResumeController,
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
resumesRouter.delete('/:id', async (req, res, next) => {
  try {
    const user = req.user;
    const authorId = user.id;

    const { id } = req.params;

    let existedResume = await prisma.resume.findUnique({
      where: { id: +id, authorId },
    });

    if (!existedResume) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
      });
    }

    const data = await prisma.resume.delete({ where: { id: +id, authorId } });

    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.DELETE.SUCCEED,
      data: { id: data.id },
    });
  } catch (error) {
    next(error);
  }
});

export { resumesRouter };
