# 3-Layered Architecture

- [배포 웹사이트 링크](https://www.yooseungyeop.shop/)

- [API 명세서](https://modolee.notion.site/78aef426bed046338ee76802132e847c)

- [ERD](https://drawsql.app/teams/team-modolee/diagrams/sparta-node-advanced)
***
  
## 📢 개요
- 목표: 3-Layered Architecture와 테스트 코드를 적용하여 유지보수성과 신뢰성을 높입니다.
-  3-Layered Architecture를 이해하고 적용
-  객체지향프로그래밍의 기초인 Class를 이해하고 사용
-  DI(Dependency Injection, 의존성 주입)을 통해 Layer 간의 결합도를 낮춘다.
-  테스트 코드를 작성하여 반복되는 테스트 작업을 줄이며, 신뢰도 높은 코드를 작성
 
  ![Untitled](https://github.com/seungyeopyoo/node-shimhwa/assets/166491440/074e0a93-54cc-47a0-aa7c-187210733ba2)

  ***
### 폴더 구조

```markdown
node_modules/
prisma/
└── schema.prisma
📦src
 ┣ 📂constants
 ┃ ┣ 📜auth.constant.js
 ┃ ┣ 📜env.constant.js
 ┃ ┣ 📜http-status.constant.js
 ┃ ┣ 📜message.constant.js
 ┃ ┗ 📜resume.constant.js
 ┣ 📂controllers
 ┃ ┣ 📜auth.controller.js
 ┃ ┣ 📜resumes.controller.js
 ┃ ┗ 📜users.controller.js
 ┣ 📂errors
 ┃ ┗ 📜http.error.js
 ┣ 📂middlewares
 ┃ ┣ 📂validators
 ┃ ┃ ┣ 📜create-resume-validator.middleware.js
 ┃ ┃ ┣ 📜sign-in-validator.middleware.js
 ┃ ┃ ┣ 📜sign-up-validator.middleware.js
 ┃ ┃ ┗ 📜updated-resume-validator.middleware.js
 ┃ ┣ 📜error-handler.middleware.js
 ┃ ┗ 📜require-access-token.middleware.js
 ┣ 📂repositories
 ┃ ┣ 📜auth.repository.js
 ┃ ┣ 📜resumes.repository.js
 ┃ ┗ 📜users.repository.js
 ┣ 📂routers
 ┃ ┣ 📜auth.router.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜resumes.router.js
 ┃ ┗ 📜users.router.js
 ┣ 📂services
 ┃ ┣ 📜auth.service.js
 ┃ ┗ 📜resumes.service.js
 ┣ 📂utils
 ┃ ┗ 📜prisma.util.js
 ┗ 📜app.js
.env
.gitignore
.prettierrc
package-lock.json
package.json
README.md
yarn.lock
```
***
## ✨ 사용 기술
  ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
  ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
  ![AWS](https://img.shields.io/badge/AWS-2D3748?style=for-the-badge&logo=AWS&logoColor=black)


1. **웹 프레임워크**: Node.js에서 가장 대표적인 웹 프레임워크인 **Express.js**를 사용합니다.
2. **패키지 매니저**: 대형 코드의 일관성, 보안, 성능 문제 해결에 적합한 **yarn** 패키지 매니저를 사용합니다. **(npm을 사용해도 되지만, 두 가지를 혼용하지는 마세요)**
3. **모듈 시스템**: 최신 JS 문법을 지원하는 ESM(ES6 모듈 시스템)을 사용합니다.
4. **데이터베이스**: 대표적인 **RDBMS**인 **MySQL**을 직접 설치하지 않고, Cloud 서비스 **AWS RDS**에서 대여해 사용합니다.
5. **ORM**: **MySQL**의 데이터를 쉽게 읽고 쓰게 해주는 [Prisma](https://www.prisma.io/)를 사용합니다.
6. **인증**: 확장성이 뛰어나며 다양한 플랫폼에서 이용 가능한 [**JWT(JSON Web Token)**](https://jwt.io/)를 이용합니다.
7. **테스팅 프레임워크**: 복잡한 설정이 필요 없으며 다양한 기능을 제공하는 [**Jest**](https://jestjs.io/)를 이용합니다.

***



