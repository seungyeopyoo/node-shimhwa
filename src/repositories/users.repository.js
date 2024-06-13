import { prisma } from '../utils/prisma.util.js';

class UserRepository {
  async findUserById(userId) {
    return prisma.user.findUnique({ where: { id: userId } });
  }
}

export default new UserRepository();
