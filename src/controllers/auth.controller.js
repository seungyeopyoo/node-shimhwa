import AuthService from '../services/auth.service.js';

class AuthController {
  // 회원가입 컨트롤러
  async signUp(req, res, next) {
    try {
      const { email, password, name } = req.body; // 요청 본문에서 이메일, 비밀번호, 이름 추출
      const result = await AuthService.signUp(email, password, name); // 회원가입 서비스 호출
      res.status(result.status).json(result); // 성공 응답 반환
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message }); // 오류 응답 반환
      next(error); // 오류를 다음 미들웨어로 전달
    }
  }

  // 로그인 컨트롤러
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body; // 요청 본문에서 이메일과 비밀번호 추출
      const result = await AuthService.signIn(email, password); // 로그인 서비스 호출
      res.status(result.status).json(result); // 성공 응답 반환
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message }); // 오류 응답 반환
      next(error); // 오류를 다음 미들웨어로 전달
    }
  }
}

export default new AuthController();
