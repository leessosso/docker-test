#!/bin/bash

# 스크립트 실행 오류 시 중단
set -e

# 환경 변수 로드
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# 최신 이미지 가져오기
echo "최신 Docker 이미지를 가져오는 중..."
docker pull ${DOCKER_HUB_USERNAME}/franchise-website:latest

# 기존 컨테이너 중지 및 제거
echo "기존 컨테이너 정리 중..."
docker-compose -f docker-compose.prod.yml down || true

# 새 컨테이너 시작
echo "새 컨테이너 시작 중..."
docker-compose -f docker-compose.prod.yml up -d

# 사용하지 않는 이미지 정리
echo "사용하지 않는 이미지 정리 중..."
docker image prune -af --filter "until=24h"

echo "배포가 완료되었습니다!" 