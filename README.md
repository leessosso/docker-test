# 프랜차이즈 웹사이트

React, TypeScript, Vite를 사용한 프랜차이즈 웹사이트 프로젝트입니다.

## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Docker
- GitHub Actions (CI/CD)

## 개발 환경 설정

### 필수 요구사항

- Node.js 20.x 이상
- npm 10.x 이상
- Docker 및 Docker Compose (선택사항)

### 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/your-username/franchise-website.git
cd franchise-website

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 빌드 및 배포

### 로컬에서 빌드

```bash
# 프로젝트 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

### Docker를 사용한 빌드 및 실행

```bash
# Docker 이미지 빌드
docker build -t franchise-website .

# Docker 컨테이너 실행
docker run -p 8080:80 franchise-website
```

### Docker Compose를 사용한 실행

```bash
# 개발 환경
docker-compose up -d

# 프로덕션 환경
docker-compose -f docker-compose.prod.yml up -d
```

## CI/CD 파이프라인

이 프로젝트는 GitHub Actions를 사용하여 CI/CD 파이프라인을 구성했습니다.

### 워크플로우 구성

1. **빌드 및 테스트**: 코드를 체크아웃하고, 의존성을 설치한 후, 린트 검사와 빌드를 실행합니다.
2. **Docker 이미지 빌드 및 푸시**: 빌드된 애플리케이션을 Docker 이미지로 패키징하고 Docker Hub에 푸시합니다.
3. **배포**: 프로덕션 서버에 SSH로 접속하여 최신 Docker 이미지를 가져와 배포합니다.

### GitHub Secrets 설정

GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 시크릿을 설정해야 합니다:

- `DOCKER_HUB_USERNAME`: Docker Hub 사용자 이름
- `DOCKER_HUB_TOKEN`: Docker Hub 액세스 토큰
- `DEPLOY_HOST`: 배포 서버 호스트 주소
- `DEPLOY_USERNAME`: 배포 서버 SSH 사용자 이름
- `DEPLOY_SSH_KEY`: 배포 서버 SSH 개인 키

### 배포 서버 설정

배포 서버에서는 다음 파일들이 필요합니다:

1. `docker-compose.prod.yml` 파일
2. `.env` 파일 (환경 변수 설정)

```bash
# 배포 서버에서 실행
mkdir -p /path/to/deployment
cd /path/to/deployment

# docker-compose.prod.yml 및 .env 파일 생성
# GitHub Actions에서 자동으로 Docker 이미지를 가져와 배포합니다
```

## 라이센스

MIT

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# 프랜차이즈 웹사이트 쿠버네티스 배포 가이드

## 사전 요구사항

- Docker Desktop with Kubernetes enabled
- kubectl CLI tool
- Docker Hub 계정

## 배포 순서

1. Docker Hub 인증 설정
```bash
# Docker Hub 인증 정보 설정
sh create-docker-secret.sh [DOCKER_HUB_USERNAME] [DOCKER_HUB_PASSWORD]
```

2. 애플리케이션 배포
```bash
# 기본 배포 (latest 태그 사용)
sh k8s-deploy.sh [DOCKER_HUB_USERNAME]

# 특정 버전 배포
sh k8s-deploy.sh [DOCKER_HUB_USERNAME] [TAG]
```

## 접속 방법

1. 로컬 접속
```
http://localhost:30080
```

2. 내부 네트워크 접속
```
http://[호스트IP]:30080
```

3. 외부 접속 (포트포워딩 설정 필요)
```
http://[외부IP]:30080
```

## 환경 변수 설정

- `REPLICAS`: 배포할 Pod 복제본 수 (기본값: 1)
- `K8S_NAMESPACE`: 쿠버네티스 네임스페이스 (기본값: default)
- `EXTERNAL_IP`: 외부 접속 IP (선택사항)

예시:
```bash
export REPLICAS=2
export K8S_NAMESPACE=production
sh k8s-deploy.sh [DOCKER_HUB_USERNAME] [TAG]
```

## 주의사항

1. 외부 접속을 위해서는 30080 포트에 대한 포트포워딩 설정이 필요합니다.
2. 프로덕션 환경에서는 적절한 보안 설정을 추가하시기 바랍니다.
3. 리소스 제한은 환경에 맞게 조정하시기 바랍니다.
