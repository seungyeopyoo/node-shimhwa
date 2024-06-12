import { signUpService } from '../services/auth.service.js';
import { signInService } from '../services/auth.service.js';

// 회원가입 컨트롤러
export async function signUpController(req, res, next) {
  try {
    const { email, password, name } = req.body; // 요청 본문에서 이메일, 비밀번호, 이름 추출
    const result = await signUpService(email, password, name); // 회원가입 서비스 호출
    res.status(result.status).json(result); // 성공 응답 반환
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message }); // 오류 응답 반환
    next(error); // 오류를 다음 미들웨어로 전달
  }
}
// 로그인 컨트롤러
export async function signInController(req, res, next) {
  try {
    const { email, password } = req.body; // 요청 본문에서 이메일과 비밀번호 추출
    const result = await signInService(email, password); // 로그인 서비스 호출
    res.status(result.status).json(result); // 성공 응답 반환
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message }); // 오류 응답 반환
    next(error); // 오류를 다음 미들웨어로 전달
  }
}
