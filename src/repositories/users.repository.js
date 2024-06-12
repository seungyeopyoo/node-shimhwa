import { prisma } from '../utils/prisma.util.js';

export async function findUserById(userId) {
  return prisma.user.findUnique({ where: { id: userId } });
}
