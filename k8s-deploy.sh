#!/bin/bash

# 에러 발생 시 스크립트 종료
set -e

# 로그 함수
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# 명령줄 인자 확인
DOCKER_HUB_USERNAME=$1
TAG=$2

# 필수 인자 확인
if [ -z "$DOCKER_HUB_USERNAME" ]; then
  log "오류: DOCKER_HUB_USERNAME 인자가 전달되지 않았습니다."
  log "사용법: sh k8s-deploy.sh [DOCKER_HUB_USERNAME] [TAG]"
  log "예시: sh k8s-deploy.sh johndoe v1.0.0"
  exit 1
fi

if [ -z "$TAG" ]; then
  log "경고: TAG가 지정되지 않아 'latest'를 사용합니다."
  TAG="latest"
fi

# 환경 변수 기본값 설정
REPLICAS=${REPLICAS:-1}  # 미니PC 환경을 고려하여 기본값을 1로 설정
K8S_NAMESPACE=${K8S_NAMESPACE:-default}
IMAGE_NAME="$DOCKER_HUB_USERNAME/franchise-website:$TAG"

log "===== 쿠버네티스 배포 시작 ====="

# 현재 context 확인
log "현재 쿠버네티스 컨텍스트: $(kubectl config current-context)"

# 네임스페이스 존재 확인 및 생성
if ! kubectl get namespace $K8S_NAMESPACE &> /dev/null; then
  log "네임스페이스 '$K8S_NAMESPACE'가 존재하지 않아 생성합니다."
  kubectl create namespace $K8S_NAMESPACE
fi

# deployment.yaml 파일 업데이트
log "이미지 이름 업데이트: $IMAGE_NAME"
sed -i "s|\${DOCKER_HUB_USERNAME}/franchise-website:latest|$IMAGE_NAME|g" k8s/deployment.yaml

# 레플리카 수 업데이트
log "레플리카 수 설정: $REPLICAS"
sed -i "s|replicas: 1|replicas: $REPLICAS|g" k8s/deployment.yaml

# Kustomize를 이용한 리소스 배포
log "쿠버네티스 리소스 적용 중..."
kubectl apply -k k8s/ -n $K8S_NAMESPACE

# 배포 상태 확인
log "배포 상태 확인 중..."
kubectl rollout status deployment/franchise-website -n $K8S_NAMESPACE

# 서비스 정보 출력
log "서비스 정보:"
kubectl get service franchise-website-service -n $K8S_NAMESPACE

log "===== 쿠버네티스 배포 완료 ====="

# 접속 정보 출력
log "접속 방법:"
log "1. 로컬 접속: http://localhost:30080"
log "2. 내부 네트워크 접속: http://[호스트IP]:30080"
if [ -n "${EXTERNAL_IP}" ]; then
  log "3. 외부 접속: http://${EXTERNAL_IP}:30080"
fi
log "참고: 외부 접속을 위해서는 30080 포트에 대한 포트포워딩이 필요합니다."