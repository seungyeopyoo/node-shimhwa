import { createResumeService } from '../services/resumes.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

// 이력서 생성 컨트롤러
export async function createResumeController(req, res, next) {
  try {
    const user = req.user;
    const { title, content } = req.body;
    const authorId = user.id;

    const data = await createResumeService(authorId, title, content);

    return res.status(HTTP_STATUS.CREATED).json({
      status: HTTP_STATUS.CREATED,
      message: MESSAGES.RESUMES.CREATE.SUCCEED,
      data,
    });
  } catch (error) {
    next(error);
  }
}
