#!/bin/bash

# 로그 함수
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# 필수 인자 확인
DOCKER_HUB_USERNAME=$1
DOCKER_HUB_PASSWORD=$2

if [ -z "$DOCKER_HUB_USERNAME" ] || [ -z "$DOCKER_HUB_PASSWORD" ]; then
  log "오류: Docker Hub 인증 정보가 필요합니다."
  log "사용법: sh create-docker-secret.sh [DOCKER_HUB_USERNAME] [DOCKER_HUB_PASSWORD]"
  exit 1
fi

# 네임스페이스 설정
K8S_NAMESPACE=${K8S_NAMESPACE:-default}

# Docker Hub 인증 시크릿 생성
log "Docker Hub 인증 시크릿 생성 중..."
kubectl create secret docker-registry regcred \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=$DOCKER_HUB_USERNAME \
  --docker-password=$DOCKER_HUB_PASSWORD \
  --namespace=$K8S_NAMESPACE \
  --dry-run=client -o yaml | kubectl apply -f -

log "Docker Hub 인증 시크릿이 생성되었습니다." 