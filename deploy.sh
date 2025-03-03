#!/bin/bash

# 스크립트 실행 오류 시 중단
set -e

# 로그 함수
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# 환경 변수 로드
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
  log "환경 변수를 로드했습니다."
else
  log "경고: .env 파일이 없습니다. .env.example을 복사하여 사용합니다."
  cp .env.example .env
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# 필수 환경 변수 확인
if [ -z "$DOCKER_HUB_USERNAME" ]; then
  log "오류: DOCKER_HUB_USERNAME 환경 변수가 설정되지 않았습니다."
  exit 1
fi

# 최신 이미지 가져오기
log "최신 Docker 이미지를 가져오는 중..."
docker pull ${DOCKER_HUB_USERNAME}/franchise-website:latest || {
  log "오류: Docker 이미지를 가져오는데 실패했습니다."
  exit 1
}

# 기존 컨테이너 중지 및 제거
log "기존 컨테이너 정리 중..."
docker-compose -f docker-compose.prod.yml down || true

# 새 컨테이너 시작
log "새 컨테이너 시작 중..."
docker-compose -f docker-compose.prod.yml up -d || {
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

log "배포가 완료되었습니다!" 