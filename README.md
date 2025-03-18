# Docker Test Frontend

React와 TypeScript를 사용한 프론트엔드 프로젝트입니다.

## 기술 스택

- React 19
- TypeScript 5.7
- Vite 6.2
- Tailwind CSS 3.4
- Docker
- GitHub Actions

## 주요 의존성

- React Router DOM 7.2
- Headless UI 2.2
- Hero Icons 2.2

## 개발 환경 설정

### 필수 요구사항

- Node.js 20.x 이상
- npm 10.x 이상
- Docker 및 Docker Compose (선택사항)

### 로컬 개발 환경 설정

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 수정하여 필요한 환경 변수 설정

# 개발 서버 실행
npm run dev
```

## 빌드 및 배포

### 로컬에서 빌드

```bash
# TypeScript 타입 체크 및 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

### Docker를 사용한 빌드 및 실행

```bash
# Docker 이미지 빌드
docker build -t docker-test-frontend .

# Docker 컨테이너 실행 (개발 환경)
docker-compose up -d

# Docker 컨테이너 실행 (프로덕션 환경)
docker-compose -f docker-compose.prod.yml up -d
```

## CI/CD 파이프라인

GitHub Actions를 통한 자동 배포가 구성되어 있습니다.

### GitHub Secrets 설정

다음 시크릿들을 GitHub 저장소 설정에 추가해야 합니다:

- `SERVER_HOST`: 배포 서버 호스트 주소
- `SERVER_USERNAME`: SSH 접속용 사용자 이름
- `SSH_PRIVATE_KEY`: SSH 개인키

### 배포 프로세스

1. main 브랜치에 push 또는 PR merge 시 자동으로 배포가 시작됩니다.
2. TypeScript 타입 체크 및 린트 검사를 실행합니다.
3. 프로덕션용 빌드를 생성합니다.
4. Docker 이미지를 빌드하고 배포 서버에 전송합니다.
5. 배포 서버에서 새 버전을 실행합니다.

## 개발 가이드

### 코드 품질 관리

```bash
# 린트 검사
npm run lint

# TypeScript 타입 체크
tsc --noEmit
```

### 디렉토리 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── pages/         # 페이지 컴포넌트
├── hooks/         # 커스텀 훅
├── services/      # API 통신 로직
├── types/         # TypeScript 타입 정의
└── utils/         # 유틸리티 함수
```

## 문제 해결

### 포트 충돌 시

기본적으로 개발 서버는 5173 포트를 사용합니다. 포트 충돌이 발생하면:

1. `.env` 파일에서 `VITE_PORT` 값을 변경하거나
2. `package.json`의 dev 스크립트에 `--port` 옵션을 추가하세요.

### Docker 관련 문제

Windows WSL2 사용 시 포트 포워딩 문제가 발생할 수 있습니다. 자세한 해결 방법은 `wsl2-port-forwarding-guide.md`를 참고하세요.
