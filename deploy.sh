#!/bin/bash

# 스크립트 실행 오류 시 중단
set -e

# 스크립트 디렉토리로 이동
cd "$(dirname "$0")"

# 로그 함수
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Docker 데몬 실행 확인
if ! docker info > /dev/null 2>&1; then
    log "Docker 데몬이 실행되지 않았습니다. 시작합니다..."
    sudo service docker start
    sleep 3
fi

# 환경 변수 로드
if [ -f .env ]; then
    set -a
    source .env
    set +a
    log "환경 변수를 로드했습니다."
else
    log "경고: .env 파일이 없습니다. .env.example을 복사하여 사용합니다."
    cp .env.example .env
    set -a
    source .env
    set +a
fi

# 필수 환경 변수 확인
if [ -z "$DOCKER_HUB_USERNAME" ]; then
    log "오류: DOCKER_HUB_USERNAME 환경 변수가 설정되지 않았습니다."
    exit 1
fi

# docker-compose 명령어 확인
if ! command -v docker-compose &> /dev/null; then
    if command -v docker compose &> /dev/null; then
        alias docker-compose='docker compose'
    else
        log "오류: docker-compose 명령어를 찾을 수 없습니다."
        exit 1
    fi
fi

# 최신 이미지 가져오기
log "최신 Docker 이미지를 가져오는 중..."
docker pull $DOCKER_HUB_USERNAME/franchise-website:latest || {
    log "오류: Docker 이미지를 가져오는데 실패했습니다."
    exit 1
}

# 기존 컨테이너 중지 및 제거
log "기존 컨테이너 정리 중..."
docker compose -f docker-compose.prod.yml down || true

# 환경 변수 설정
export DOCKER_IMAGE=${DOCKER_HUB_USERNAME}/franchise-website:latest
if grep -q "DOCKER_IMAGE=" .env; then
    sed -i "s|DOCKER_IMAGE=.*|DOCKER_IMAGE=$DOCKER_IMAGE|" .env
else
    echo "DOCKER_IMAGE=$DOCKER_IMAGE" >> .env
fi

# 네트워크 확인
log "franchise-network 네트워크 확인 중..."
if ! docker network ls | grep -q "franchise-network"; then
    log "경고: franchise-network 네트워크가 없습니다. 백엔드를 먼저 배포해야 합니다."
    log "백엔드 배포 명령어: cd ../docker-test-backend && ./deploy.sh"
    exit 1
fi

# 새 컨테이너 시작
log "새 컨테이너 시작 중..."
docker compose -f docker-compose.prod.yml up -d || {
    log "오류: 컨테이너 시작에 실패했습니다."
    exit 1
}

# 컨테이너 상태 확인
log "컨테이너 상태 확인 중..."
sleep 5
if [ "$(docker ps -q -f name=franchise-website)" ]; then
    log "컨테이너가 정상적으로 실행 중입니다."
else
    log "오류: 컨테이너가 실행되지 않았습니다."
    docker logs franchise-website
    exit 1
fi

# 사용하지 않는 이미지 정리
log "사용하지 않는 이미지 정리 중..."
docker image prune -af --filter "until=24h"

log "프론트엔드 배포가 완료되었습니다!"
log "프론트엔드와 백엔드 서비스가 모두 실행 중입니다."
log "프론트엔드: http://localhost:9876"
log "백엔드: http://localhost:5000" 