import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { ACCESS_TOKEN_EXPIRES_IN } from '../constants/auth.constant.js';
import AuthRepository from '../repositories/auth.repository.js';

class AuthService {
  // 회원가입 서비스
  async signUp(email, password, name) {
    // 이메일로 사용자 검색
    const existedUser = await AuthRepository.findUserByEmail(email);

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
    const data = await AuthRepository.createUser({
      email,
      password: hashedPassword,
      name,
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

  // 로그인 서비스
  async signIn(email, password) {
    // 이메일로 사용자 검색
    const user = await AuthRepository.findUserByEmail(email);

    // 비밀번호 비교
    const isPasswordMatched =
      user && bcrypt.compareSync(password, user.password);

    // 비밀번호가 일치하지 않는 경우 예외 처리
    if (!isPasswordMatched) {
      throw {
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
      };
    }

    // JWT 페이로드 생성
    const payload = { id: user.id };

    // JWT 액세스 토큰 생성
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    // 성공 응답 반환
    return {
      status: HTTP_STATUS.OK,
      message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
      data: { accessToken },
    };
  }
  // 사용자 검색 서비스
  async getUserById(id) {
    const user = await AuthRepository.findUserById(id);
    return user;
  }
}

export default new AuthService();
