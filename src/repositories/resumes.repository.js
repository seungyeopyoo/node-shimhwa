import { prisma } from '../utils/prisma.util.js';

class ResumeRepository {
  // 이력서 생성
  async createResume(data) {
    return prisma.resume.create({ data });
  }

  // 이력서 목록 조회
  async getResumesByAuthorId(authorId, sort) {
    return prisma.resume.findMany({
      where: { authorId },
      orderBy: {
        createdAt: sort,
      },
      include: {
        author: true,
      },
    });
  }

  // 이력서 상세 조회
  async getResumeByIdAndAuthor(id, authorId) {
    return prisma.resume.findUnique({
      where: { id, authorId },
      include: { author: true },
    });
  }

  // 이력서 수정 함수
  async updateResumeByIdAndAuthor(id, authorId, data) {
    return prisma.resume.update({
      where: { id, authorId },
      data,
    });
  }

  // 이력서 삭제 함수
  async deleteResumeByIdAndAuthor(id, authorId) {
    return prisma.resume.delete({
      where: { id, authorId },
    });
  }
}
export default new ResumeRepository();
