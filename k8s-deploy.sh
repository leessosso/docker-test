#!/bin/bash

# 에러 발생 시 스크립트 종료
set -e

# 환경 변수 확인
if [ -z "$DOCKER_HUB_USERNAME" ]; then
  echo "DOCKER_HUB_USERNAME 환경 변수가 설정되지 않았습니다."
  exit 1
fi

# 이미지 태그(버전) 설정
TAG=${TAG:-latest}
IMAGE_NAME="$DOCKER_HUB_USERNAME/franchise-website:$TAG"

echo "===== 쿠버네티스 배포 시작 ====="

# 현재 context 확인
echo "현재 쿠버네티스 컨텍스트: $(kubectl config current-context)"

# deployment.yaml 파일에서 이미지 이름 변경
echo "이미지 이름 업데이트: $IMAGE_NAME"
sed -i "s|\${DOCKER_HUB_USERNAME}/franchise-website:latest|$IMAGE_NAME|g" k8s/deployment.yaml

# Kustomize를 이용한 리소스 배포
echo "쿠버네티스 리소스 적용 중..."
kubectl apply -k k8s/

# 배포 상태 확인
echo "배포 상태 확인 중..."
kubectl rollout status deployment/franchise-website

echo "===== 쿠버네티스 배포 완료 =====" 