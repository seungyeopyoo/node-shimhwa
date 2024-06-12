import { createResume } from '../repositories/resumes.repository.js';

export async function createResumeService(authorId, title, content) {
  const data = await createResume({
    authorId,
    title,
    content,
  });

  return data;
}
