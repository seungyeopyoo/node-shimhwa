import { prisma } from '../utils/prisma.util.js';

class AuthRepository {
  // 이메일로 사용자 검색
  async findUserByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  // 새로운 사용자 생성
  async createUser(data) {
    return prisma.user.create({ data });
  }
  // ID로 사용자 검색
  async findUserById(id) {
    return prisma.user.findUnique({ where: { id } });
  }
}

export default new AuthRepository();
