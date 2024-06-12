import bcrypt from 'bcrypt';
import { prisma } from '../utils/prisma.util.js';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

// 회원가입 서비스
export async function signUpService(email, password, name) {
  // 이메일로 사용자 검색
  const existedUser = await prisma.user.findUnique({ where: { email } });

  // 이메일이 이미 존재하는 경우 예외 처리
  if (existedUser) {
    throw {
      status: HTTP_STATUS.CONFLICT,
      message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
    };
  }

  // 비밀번호 해시화
  const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

  // 새로운 사용자 생성
  const data = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // 비밀번호 제거하여 응답 데이터에서 숨김
  data.password = undefined;

  // 성공 응답 반환
  return {
    status: HTTP_STATUS.CREATED,
    message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
    data,
  };
}
