# 쿠버네티스 배포 가이드

이 문서는 프랜차이즈 웹사이트를 쿠버네티스 클러스터에 배포하는 방법을 설명합니다.

## 시스템 아키텍처

```
[ 사용자 ] --> [ 인그레스 컨트롤러 ] --> [ Service ] --> [ Deployment (3 Pods) ]
    |                   |                                        |
    |                   |                                        |
    v                   v                                        v
[ HTTPS ]          [ TLS 종료 ]                           [ Nginx 웹 서버 ]
                                                               |
                                                               |
                                                               v
[ ConfigMap ] --> [ 환경 변수 ] --> [ 애플리케이션 컨테이너 ]
```

## 쿠버네티스 구성요소 관계

```
                                +----------------+
                                | Ingress        |
                                | (외부 접근 설정) |
                                +-------+--------+
                                        |
                                        v
+-----------------+           +-----------------+
| ConfigMap       |           | Service         |
| (환경 변수 설정)  +---------->| (로드 밸런싱)    |
+-----------------+           +--------+--------+
                                       |
                                       v
                              +------------------+
                              | Deployment       |
                              | (Pod 관리)       |
                              +--------+---------+
                                       |
                                       v
                              +------------------+
                              | Pod 1 | Pod 2 | Pod 3 |
                              | (컨테이너 실행)   |
                              +------------------+
```

## 프로젝트 파일 구조

```
project-root/
│
├── k8s/                               # 쿠버네티스 관련 파일
│   ├── deployment.yaml                # 애플리케이션 배포 설정
│   ├── service.yaml                   # 서비스 설정
│   ├── configmap.yaml                 # 환경 변수 설정
│   ├── ingress.yaml                   # 외부 접근 설정
│   ├── kustomization.yaml             # 리소스 통합 관리
│   └── README.md                      # 배포 가이드 (현재 문서)
│
├── k8s-deploy.sh                      # 쿠버네티스 배포 스크립트
├── Dockerfile                         # 이미지 빌드 설정
├── nginx.conf                         # Nginx 설정
│
├── src/                               # 애플리케이션 소스 코드
├── public/                            # 정적 파일
├── package.json                       # 의존성 관리
└── vite.config.ts                     # 빌드 설정
```

## 배포 흐름

```
1. 도커 이미지 빌드  -->  2. 이미지 푸시  -->  3. k8s 배포  -->  4. 검증
   [Dockerfile]          [Docker Hub]        [k8s-deploy.sh]    [kubectl]
```

## 사전 요구사항

- kubectl 설치 및 설정
- 쿠버네티스 클러스터 접근 권한
- Docker Hub 계정 (이미지 저장소)

## 배포 구성 요소

- **Deployment**: 웹 애플리케이션 컨테이너를 배포합니다.
- **Service**: 웹 애플리케이션에 접근하기 위한 서비스를 생성합니다.
- **ConfigMap**: 환경 변수와 설정을 관리합니다.
- **Ingress**: 외부에서 서비스에 접근할 수 있도록 설정합니다.

## 배포 방법

### 1. 환경 변수 설정

```bash
export DOCKER_HUB_USERNAME=your-dockerhub-username
export TAG=latest  # 원하는 이미지 태그
```

### 2. 도커 이미지 빌드 및 푸시

```bash
docker build -t $DOCKER_HUB_USERNAME/franchise-website:$TAG .
docker push $DOCKER_HUB_USERNAME/franchise-website:$TAG
```

### 3. 쿠버네티스 리소스 배포

자동 배포 스크립트 사용:
```bash
chmod +x k8s-deploy.sh
./k8s-deploy.sh
```

또는 수동으로 배포:
```bash
# deployment.yaml 파일의 이미지 경로 수정
sed -i "s|\${DOCKER_HUB_USERNAME}/franchise-website:latest|$DOCKER_HUB_USERNAME/franchise-website:$TAG|g" k8s/deployment.yaml

# Kustomize를 사용하여 모든 리소스 배포
kubectl apply -k k8s/
```

### 4. 배포 확인

```bash
kubectl get pods
kubectl get services
kubectl get ingress
```

## 스케일링

필요에 따라 레플리카 수를 조정할 수 있습니다:

```bash
kubectl scale deployment franchise-website --replicas=5
```

## 문제 해결

로그 확인:
```bash
kubectl logs -l app=franchise-website
```

포드 상태 확인:
```bash
kubectl describe pods -l app=franchise-website
```

## 삭제

모든 리소스 삭제:
```bash
kubectl delete -k k8s/
``` 