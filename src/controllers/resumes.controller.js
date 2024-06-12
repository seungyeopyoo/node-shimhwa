import {
  createResumeService,
  getResumesService,
} from '../services/resumes.service.js';
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

// 이력서 목록 조회 컨트롤러
export async function getResumesController(req, res, next) {
  try {
    const user = req.user; // 요청에서 사용자 정보 추출
    const authorId = user.id;
    let { sort } = req.query;

    // 정렬 방식 기본값 설정
    sort = sort?.toLowerCase();
    if (sort !== 'desc' && sort !== 'asc') {
      sort = 'desc';
    }

    // 이력서 목록 조회 서비스 호출
    const data = await getResumesService(authorId, sort);

    // 성공 응답 반환
    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
      data,
    });
  } catch (error) {
    // 오류를 다음 미들웨어로 전달
    next(error);
  }
}
