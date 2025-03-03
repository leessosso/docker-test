# GitHub Actions 설정 가이드

이 문서는 GitHub Actions를 사용하여 React 프로젝트를 Docker 이미지로 빌드하고 서버에 배포하는 방법을 설명합니다.

## 필요한 GitHub Secrets 설정

GitHub 저장소의 Settings > Secrets and variables > Actions 메뉴에서 다음 시크릿을 설정해야 합니다:

1. `DOCKER_HUB_USERNAME`: Docker Hub 사용자 이름
2. `DOCKER_HUB_TOKEN`: Docker Hub 액세스 토큰 (Docker Hub 계정 설정에서 생성)
3. `SSH_HOST`: 배포할 서버의 IP 주소 (예: 218.154.6.165)
4. `SSH_USERNAME`: SSH 접속 사용자 이름 (예: lee)
5. `SSH_PORT`: SSH 포트 (기본값: 22, 현재 설정: 1234)
6. `SSH_PASSWORD`: SSH 접속 비밀번호

## 서버 준비 사항

1. Docker와 Docker Compose가 설치되어 있어야 합니다.
2. 배포 디렉토리가 생성되어 있어야 합니다 (예: `/path/to/your/project`).
3. 서버에 `.env` 파일을 생성하고 필요한 환경 변수를 설정해야 합니다.

## 배포 과정

GitHub Actions 워크플로우는 다음 단계로 진행됩니다:

1. 코드 체크아웃
2. Node.js 설정
3. 의존성 설치
4. 코드 린트 검사
5. 프로젝트 빌드
6. Docker 이미지 빌드 및 Docker Hub에 푸시
7. 배포 파일을 서버에 복사
8. 서버에서 배포 스크립트 실행

## 수동 배포 방법

GitHub Actions 외에도 수동으로 배포할 수 있습니다:

1. 서버에 접속: `ssh username@host -p port`
2. 프로젝트 디렉토리로 이동: `cd /path/to/your/project`
3. 배포 스크립트 실행: `./deploy.sh`

## 문제 해결

배포 중 문제가 발생하면 다음을 확인하세요:

1. Docker 컨테이너 로그: `docker logs franchise-website`
2. Docker Compose 상태: `docker-compose -f docker-compose.prod.yml ps`
3. GitHub Actions 워크플로우 로그: GitHub 저장소의 Actions 탭에서 확인

## 참고 사항

- 보안을 위해 SSH 키 기반 인증으로 전환하는 것을 권장합니다.
- 프로덕션 환경에서는 HTTPS를 설정하는 것이 좋습니다. 