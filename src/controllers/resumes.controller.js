import {
  createResumeService,
  getResumesService,
  getResumeService,
  updateResumeService,
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

// 특정 이력서 조회 컨트롤러
export async function getResumeController(req, res, next) {
  try {
    const user = req.user; // 요청에서 사용자 정보 추출
    const authorId = user.id;
    const { id } = req.params; // 요청 경로에서 이력서 ID 추출

    // 이력서 조회 서비스 호출
    const data = await getResumeService(Number(id), authorId);

    if (!data) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
      });
    }

    // 성공 응답 반환
    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
      data,
    });
  } catch (error) {
    // 오류를 다음 미들웨어로 전달
    next(error);
  }
}

// 이력서 업데이트 컨트롤러
export async function updateResumeController(req, res, next) {
  try {
    const user = req.user; // 요청에서 사용자 정보 추출
    const authorId = user.id;
    const { id } = req.params; // 요청 경로에서 이력서 ID 추출
    const { title, content } = req.body; // 요청 본문에서 제목과 내용을 추출

    // 이력서 업데이트 서비스 호출
    const data = await updateResumeService(
      Number(id),
      authorId,
      title,
      content,
    );

    // 성공 응답 반환
    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.UPDATE.SUCCEED,
      data,
    });
  } catch (error) {
    // 오류를 다음 미들웨어로 전달
    next(error);
  }
}
