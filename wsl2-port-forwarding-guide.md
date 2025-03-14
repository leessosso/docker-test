# WSL2 포트 포워딩 자동화 가이드

WSL2를 사용하여 Docker를 실행할 때 포트 포워딩 문제를 해결하고 자동화하는 방법을 설명합니다.

## WSL2와 Docker 실행 방식

Windows에서 Docker를 실행하는 방식은 크게 두 가지가 있습니다:

1. **Docker Desktop with WSL2 백엔드**:
   - Docker Desktop은 Windows에서 Docker를 쉽게 사용할 수 있게 해주는 애플리케이션입니다.
   - WSL2를 백엔드로 사용하면 Docker Desktop은 WSL2의 경량 가상 머신을 활용하여 Linux 컨테이너를 실행합니다.
   - 이 방식에서는 Ubuntu와 같은 Linux 배포판을 WSL2에 설치하고, Docker Desktop이 이 환경을 활용합니다.

2. **WSL2 내부에 Docker Engine 직접 설치**:
   - WSL2에 Ubuntu를 설치한 후, 그 안에 Docker Engine을 직접 설치하는 방식입니다.
   - Docker Desktop 없이도 WSL2의 Ubuntu 내에서 Docker 명령어를 직접 실행할 수 있습니다.

## WSL2 포트 포워딩 문제

WSL2에 직접 Docker를 설치하여 사용할 때는 포트 포워딩을 수동으로 설정해야 합니다. WSL2는 자체 IP 주소를 가진 가상 머신으로 동작하기 때문에, WSL2 내부에서 실행 중인 서비스에 Windows 호스트에서 접근하려면 포트 포워딩이 필요합니다.

문제는 WSL2를 재시작하거나 컴퓨터를 재부팅하면 WSL2의 IP 주소가 변경될 수 있다는 점입니다. 그럴 경우 포트 포워딩을 다시 설정해야 합니다.

## 수동 포트 포워딩 설정 방법

1. **WSL2의 IP 주소 확인**:
   ```bash
   ip addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}'
   ```
   또는
   ```bash
   hostname -I
   ```

2. **Windows에서 포트 포워딩 설정** (관리자 권한의 PowerShell에서):
   ```powershell
   netsh interface portproxy add v4tov4 listenport=9876 listenaddress=0.0.0.0 connectport=9876 connectaddress=[WSL2_IP_ADDRESS]
   ```

3. **Windows 방화벽 설정**:
   ```powershell
   New-NetFirewallRule -DisplayName "WSL2 Port 9876" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 9876
   ```

## 포트 포워딩 자동화 방법

### 방법 1: PowerShell 스크립트 생성 및 자동 실행

#### 1. PowerShell 스크립트 생성

다음 내용으로 PowerShell 스크립트 파일을 생성합니다:

```powershell
# wsl-port-forward.ps1
# WSL2 IP 주소 가져오기
$wslIp = (wsl hostname -I).Trim().Split(" ")[0]
Write-Host "WSL2 IP: $wslIp"

# 기존 포트 포워딩 규칙 제거
Write-Host "기존 포트 포워딩 규칙 제거..."
netsh interface portproxy reset

# 새 포트 포워딩 규칙 추가
# 필요한 포트를 여기에 추가하세요
$ports = @(9876)  # 필요한 다른 포트도 여기에 추가 (예: 80, 443, 3000 등)

foreach ($port in $ports) {
    Write-Host "포트 $port 포워딩 설정 중..."
    netsh interface portproxy add v4tov4 listenport=$port listenaddress=0.0.0.0 connectport=$port connectaddress=$wslIp
}

# 방화벽 규칙 확인 및 추가
foreach ($port in $ports) {
    $ruleName = "WSL2 Port $port"
    $existingRule = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
    
    if (-not $existingRule) {
        Write-Host "방화벽 규칙 '$ruleName' 추가 중..."
        New-NetFirewallRule -DisplayName $ruleName -Direction Inbound -Action Allow -Protocol TCP -LocalPort $port
    } else {
        Write-Host "방화벽 규칙 '$ruleName'이 이미 존재합니다."
    }
}

# 현재 포트 포워딩 설정 표시
Write-Host "현재 포트 포워딩 설정:"
netsh interface portproxy show all
```

이 파일을 `C:\Scripts\wsl-port-forward.ps1`과 같은 경로에 저장합니다.

#### 2. 자동 실행 설정 방법

##### 방법 A: 작업 스케줄러 사용

1. Windows 작업 스케줄러를 엽니다 (시작 메뉴에서 "작업 스케줄러" 검색).
2. "작업 만들기"를 클릭합니다.
3. 이름을 "WSL2 Port Forwarding"으로 지정합니다.
4. "가장 높은 권한으로 실행" 옵션을 선택합니다.
5. "트리거" 탭에서 "새로 만들기"를 클릭하고 다음 트리거를 추가합니다:
   - "시작할 때"
   - "로그온할 때"
6. "동작" 탭에서 "새로 만들기"를 클릭하고:
   - 프로그램/스크립트: `powershell.exe`
   - 인수 추가: `-ExecutionPolicy Bypass -File "C:\Scripts\wsl-port-forward.ps1"`
7. "확인"을 클릭하여 작업을 저장합니다.

##### 방법 B: Windows 시작 폴더에 바로가기 추가

1. 다음 내용으로 배치 파일을 생성합니다:

```batch
@echo off
powershell -ExecutionPolicy Bypass -Command "Start-Process powershell -ArgumentList '-ExecutionPolicy Bypass -File \"C:\Scripts\wsl-port-forward.ps1\"' -Verb RunAs"
```

2. 이 파일을 `C:\Scripts\run-wsl-port-forward.bat`로 저장합니다.
3. Windows 키 + R을 누르고 `shell:startup`을 입력하여 시작 폴더를 엽니다.
4. 배치 파일의 바로가기를 이 폴더에 추가합니다.

### 방법 2: WSL 시작 시 자동 실행 스크립트

WSL2가 시작될 때 자동으로 포트 포워딩을 설정하는 방법도 있습니다:

1. `/etc/wsl.conf` 파일을 WSL2 내에서 생성하거나 편집합니다:

```bash
sudo nano /etc/wsl.conf
```

2. 다음 내용을 추가합니다:

```ini
[boot]
command = /home/yourusername/scripts/wsl-startup.sh
```

3. WSL2 내에서 스크립트 파일을 생성합니다:

```bash
mkdir -p ~/scripts
nano ~/scripts/wsl-startup.sh
```

4. 스크립트에 다음 내용을 추가합니다:

```bash
#!/bin/bash
# WSL2 IP 주소 가져오기
WSL_IP=$(hostname -I | awk '{print $1}')
# Windows 호스트에서 PowerShell 스크립트 실행
powershell.exe -ExecutionPolicy Bypass -Command "Start-Process powershell -ArgumentList '-ExecutionPolicy Bypass -Command \"netsh interface portproxy reset; netsh interface portproxy add v4tov4 listenport=9876 listenaddress=0.0.0.0 connectport=9876 connectaddress=$WSL_IP\"' -Verb RunAs"
```

5. 스크립트에 실행 권한을 부여합니다:

```bash
chmod +x ~/scripts/wsl-startup.sh
```

6. WSL2를 재시작합니다:

```powershell
wsl --shutdown
```

## 문제 해결

### 컨테이너 내부 설정 확인

Nginx 설정에서 `listen` 지시자가 올바르게 설정되어 있는지 확인하세요. `localhost`나 `127.0.0.1`이 아닌 `0.0.0.0`으로 설정되어 있어야 외부에서 접근이 가능합니다:

```nginx
server {
    listen 9876;  # 또는 listen 0.0.0.0:9876;
    # 나머지 설정...
}
```

### 컨테이너 네트워크 확인

컨테이너가 올바른 네트워크 모드로 실행되고 있는지 확인하세요:

```bash
# 컨테이너 내부에서 리스닝 포트 확인
docker exec [컨테이너_이름] netstat -tuln

# 컨테이너 네트워크 설정 확인
docker inspect [컨테이너_이름] | grep -A 20 "NetworkSettings"
```

### Docker 컨테이너 실행 시 포트 매핑 확인

Docker 컨테이너를 실행할 때 `-p` 옵션으로 포트 매핑이 제대로 되어 있는지 확인하세요:

```bash
docker run -p 9876:9876 your-image-name
```

이 가이드를 통해 WSL2에서 Docker를 사용할 때 발생하는 포트 포워딩 문제를 해결하고 자동화할 수 있습니다. 