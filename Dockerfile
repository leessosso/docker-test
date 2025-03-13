# 빌드 단계
FROM node:20-alpine as build

WORKDIR /app

# 의존성 파일 복사 및 설치 (캐싱 활용)
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# 소스 코드 복사
COPY . .

# 환경 변수 설정
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# 빌드 실행
RUN npm run build

# 실행 단계 (경량화된 이미지 사용)
FROM nginx:alpine-slim

# Nginx 설정 복사
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 헬스체크 추가
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# 80 포트 노출
EXPOSE 3000

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"] 