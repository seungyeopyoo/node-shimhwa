import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import ResumeRepository from '../repositories/resumes.repository.js';

class ResumeService {
  async createResumeService(authorId, title, content) {
    const data = await ResumeRepository.createResume({
      authorId,
      title,
      content,
    });

    return data;
  }

  // 이력서 목록 조회 서비스 함수
  async getResumesService(authorId, sort) {
    let resumes = await ResumeRepository.getResumesByAuthorId(authorId, sort);

    // 데이터 가공
    resumes = resumes.map((resume) => ({
      id: resume.id,
      authorName: resume.author.name,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    }));

    return resumes;
  }

  // 특정 이력서 조회 서비스 함수
  async getResumeService(id, authorId) {
    const resume = await ResumeRepository.getResumeByIdAndAuthor(id, authorId);

    if (!resume) {
      return null;
    }

    // 데이터 가공
    return {
      id: resume.id,
      authorName: resume.author.name,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  }

  // 이력서 업데이트 서비스 함수
  async updateResumeService(id, authorId, title, content) {
    // 기존 이력서 확인
    const existedResume = await ResumeRepository.getResumeByIdAndAuthor(
      id,
      authorId,
    );

    if (!existedResume) {
      throw {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
      };
    }

    // 업데이트할 데이터 준비
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;

    // 이력서 업데이트
    const data = await ResumeRepository.updateResumeByIdAndAuthor(
      id,
      authorId,
      updateData,
    );

    // 데이터 가공
    return data;
  }

  // 이력서 삭제 서비스 함수
  async deleteResumeService(id, authorId) {
    // 기존 이력서 확인
    const existedResume = await ResumeRepository.getResumeByIdAndAuthor(
      id,
      authorId,
    );

    if (!existedResume) {
      throw {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
      };
    }

    // 이력서 삭제
    const data = await ResumeRepository.deleteResumeByIdAndAuthor(id, authorId);

    // 삭제된 이력서 ID 반환
    return { id: data.id };
  }
}
export default new ResumeService();
