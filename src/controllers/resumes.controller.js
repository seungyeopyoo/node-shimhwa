import ResumeService from '../services/resumes.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

class ResumeController {
  // 이력서 생성 컨트롤러
  async createResumeController(req, res, next) {
    try {
      const user = req.user;
      const { title, content } = req.body;
      const authorId = user.id;

      const data = await ResumeService.createResumeService(
        authorId,
        title,
        content,
      );

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
  async getResumesController(req, res, next) {
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
      const data = await ResumeService.getResumesService(authorId, sort);

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
  async getResumeController(req, res, next) {
    try {
      const user = req.user; // 요청에서 사용자 정보 추출
      const authorId = user.id;
      const { id } = req.params; // 요청 경로에서 이력서 ID 추출

      // 이력서 조회 서비스 호출
      const data = await ResumeService.getResumeService(Number(id), authorId);

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
  async updateResumeController(req, res, next) {
    try {
      const user = req.user; // 요청에서 사용자 정보 추출
      const authorId = user.id;
      const { id } = req.params; // 요청 경로에서 이력서 ID 추출
      const { title, content } = req.body; // 요청 본문에서 제목과 내용을 추출

      // 이력서 업데이트 서비스 호출
      const data = await ResumeService.updateResumeService(
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

  // 이력서 삭제 컨트롤러
  async deleteResumeController(req, res, next) {
    try {
      const user = req.user; // 요청에서 사용자 정보 추출
      const authorId = user.id;
      const { id } = req.params; // 요청 경로에서 이력서 ID 추출

      // 이력서 삭제 서비스 호출
      const data = await ResumeService.deleteResumeService(
        Number(id),
        authorId,
      );

      // 성공 응답 반환
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.DELETE.SUCCEED,
        data: { id: data.id },
      });
    } catch (error) {
      // 오류를 다음 미들웨어로 전달
      next(error);
    }
  }
}
export default new ResumeController();
