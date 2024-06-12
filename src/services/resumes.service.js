import {
  createResume,
  getResumesByAuthorId,
  getResumeByIdAndAuthor,
  updateResumeByIdAndAuthor,
  deleteResumeByIdAndAuthor,
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

// 특정 이력서 조회 서비스 함수
export async function getResumeService(id, authorId) {
  const resume = await getResumeByIdAndAuthor(id, authorId);

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
export async function updateResumeService(id, authorId, title, content) {
  // 기존 이력서 확인
  const existedResume = await getResumeByIdAndAuthor(id, authorId);

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
  const data = await updateResumeByIdAndAuthor(id, authorId, updateData);

  // 데이터 가공
  return data;
}

// 이력서 삭제 서비스 함수
export async function deleteResumeService(id, authorId) {
  // 기존 이력서 확인
  const existedResume = await getResumeByIdAndAuthor(id, authorId);

  if (!existedResume) {
    throw {
      status: HTTP_STATUS.NOT_FOUND,
      message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
    };
  }

  // 이력서 삭제
  const data = await deleteResumeByIdAndAuthor(id, authorId);

  // 삭제된 이력서 ID 반환
  return { id: data.id };
}
