import { prisma } from '../utils/prisma.util.js';

// 이메일로 사용자 검색
export async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

// 새로운 사용자 생성
export async function createUser(data) {
  return prisma.user.create({ data });
}
