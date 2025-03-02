# CI/CD 파이프라인 설정 가이드

이 문서는 프랜차이즈 웹사이트 프로젝트의 CI/CD 파이프라인을 설정하는 방법을 안내합니다.

## 1. GitHub 저장소 설정

### 1.1. 새 GitHub 저장소 생성

1. GitHub에서 새 저장소를 생성합니다.
2. 로컬 프로젝트를 GitHub 저장소에 연결합니다:

```bash
git init
git add .
git commit -m "초기 커밋"
git branch -M main
git remote add origin https://github.com/your-username/franchise-website.git
git push -u origin main
```

### 1.2. GitHub Secrets 설정

GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 시크릿을 설정합니다:

1. `DOCKER_HUB_USERNAME`: Docker Hub 사용자 이름
2. `DOCKER_HUB_TOKEN`: Docker Hub 액세스 토큰 (Docker Hub > Account Settings > Security > New Access Token에서 생성)
3. `DEPLOY_HOST`: 배포 서버 호스트 주소 (예: 123.456.789.0)
4. `DEPLOY_USERNAME`: 배포 서버 SSH 사용자 이름
5. `DEPLOY_SSH_KEY`: 배포 서버 SSH 개인 키 (전체 키 내용을 복사하여 붙여넣기)

## 2. Docker Hub 설정

### 2.1. Docker Hub 계정 생성

아직 Docker Hub 계정이 없다면 [Docker Hub](https://hub.docker.com/)에서 계정을 생성합니다.

### 2.2. 액세스 토큰 생성

1. Docker Hub에 로그인합니다.
2. Account Settings > Security로 이동합니다.
3. "New Access Token"을 클릭합니다.
4. 토큰 이름을 입력하고 권한을 선택합니다 (최소한 "Read & Write" 권한 필요).
5. 생성된 토큰을 안전한 곳에 저장합니다 (이 토큰은 한 번만 표시됩니다).
6. 이 토큰을 GitHub Secrets의 `DOCKER_HUB_TOKEN`으로 설정합니다.

## 3. 배포 서버 설정

### 3.1. 서버 요구사항

- Linux 서버 (Ubuntu 20.04 LTS 이상 권장)
- Docker 및 Docker Compose 설치
- SSH 접속 가능

### 3.2. SSH 키 설정

1. 로컬 머신에서 SSH 키 생성 (이미 있는 경우 생략):

```bash
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```

2. 공개 키를 배포 서버에 추가:

```bash
ssh-copy-id username@your-server-ip
```

3. 개인 키 내용을 GitHub Secrets의 `DEPLOY_SSH_KEY`로 설정:

```bash
cat ~/.ssh/id_rsa
```

### 3.3. 배포 디렉토리 설정

배포 서버에서 다음 명령어를 실행합니다:

```bash
# 배포 디렉토리 생성
mkdir -p /path/to/deployment
cd /path/to/deployment

# docker-compose.prod.yml 파일 생성
# GitHub 저장소에서 복사하거나 직접 생성

# .env 파일 생성
cp /path/to/your/project/.env.example .env
# .env 파일을 편집하여 실제 값으로 설정
```

## 4. CI/CD 파이프라인 테스트

### 4.1. 코드 변경 및 푸시

1. 로컬에서 코드를 변경합니다.
2. 변경 사항을 커밋하고 푸시합니다:

```bash
git add .
git commit -m "테스트 변경"
git push origin main
```

### 4.2. GitHub Actions 워크플로우 확인

1. GitHub 저장소의 "Actions" 탭으로 이동합니다.
2. 워크플로우가 실행 중인지 확인합니다.
3. 모든 단계가 성공적으로 완료되는지 확인합니다.

### 4.3. 배포 확인

1. 배포 서버에 SSH로 접속합니다:

```bash
ssh username@your-server-ip
```

2. 배포 디렉토리로 이동하여 컨테이너 상태를 확인합니다:

```bash
cd /path/to/deployment
docker-compose -f docker-compose.prod.yml ps
```

3. 웹 브라우저에서 배포된 웹사이트에 접속하여 확인합니다.

## 5. 문제 해결

### 5.1. GitHub Actions 오류

- GitHub Actions 로그를 확인하여 오류 메시지를 파악합니다.
- Secrets가 올바르게 설정되었는지 확인합니다.
- 워크플로우 파일 (.github/workflows/ci-cd.yml)의 구문이 올바른지 확인합니다.

### 5.2. Docker 관련 오류

- Docker Hub 자격 증명이 올바른지 확인합니다.
- 배포 서버에서 Docker 및 Docker Compose가 설치되어 있는지 확인합니다.
- Docker 이미지가 성공적으로 빌드되는지 로컬에서 테스트합니다.

### 5.3. 배포 오류

- SSH 연결이 올바르게 설정되었는지 확인합니다.
- 배포 서버의 디렉토리 경로가 올바른지 확인합니다.
- 배포 서버에서 수동으로 Docker 명령어를 실행하여 테스트합니다.

## 6. 유지 관리

### 6.1. 정기적인 업데이트

- 정기적으로 의존성을 업데이트합니다.
- Docker 이미지를 정기적으로 재빌드하여 보안 패치를 적용합니다.

### 6.2. 모니터링

- 배포된 애플리케이션의 로그를 모니터링합니다.
- 서버 리소스 사용량을 모니터링합니다.

### 6.3. 백업

- 중요한 데이터를 정기적으로 백업합니다.
- 배포 구성 파일을 버전 관리 시스템에 저장합니다. 