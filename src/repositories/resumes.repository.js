import { prisma } from '../utils/prisma.util.js';

// 이력서 생성
export async function createResume(data) {
  return prisma.resume.create({ data });
}
