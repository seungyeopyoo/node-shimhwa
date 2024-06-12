import {
  createResume,
  getResumesByAuthorId,
} from '../repositories/resumes.repository.js';

export async function createResumeService(authorId, title, content) {
  const data = await createResume({
    authorId,
    title,
    content,
  });

  return data;
}

// 이력서 목록 조회 서비스 함수
export async function getResumesService(authorId, sort) {
  let resumes = await getResumesByAuthorId(authorId, sort);

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
