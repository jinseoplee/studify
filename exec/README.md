# 📥 포팅 매뉴얼
<br/>

# 1. EC2 기본 설정

## Nginx 설치

```bash
sudo apt install nginx

# 버전 확인 및 테스트
$ nginx -v
$ sudo systemctl status nginx
$ sudo nginx -t
```

## Docker & Docker Compose 설치

```bash
# Update existing packages:
$ sudo apt update -y

# Install packages to allow apt to use a repository over HTTPS:
$ sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add the Docker GPG key:
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Add the Docker repository to APT sources:
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

# Update the package database with the Docker packages from the newly added repository:
$ sudo apt update

# Install docker
$ sudo apt-get install -y docker-ce

# Verify that Docker is installed and running:
$ sudo systemctl status docker

# If the Docker service is not running, start it with the following command:
$ sudo systemctl start docker

# To run Docker without sudo, add the ubuntu user to the docker group:
$ sudo groupadd docker
$ sudo usermod -aG docker ubuntu
$ newgrp docker
$ docker run hello-world

# 테스트
$ docker info
$ sudo systemctl status docker
```
<br/>

# 2. https 서버 등록

## Let’s Encrypt 를 사용한 ssl 인증

### Nginx 설정파일 지정

```bash
# 기본 설정파일 제거
$ sudo rm /etc/nginx/sites-available/*
$ sudo rm /etc/nginx/sites-enabled/*

# 새로운 설정파일 생성
$ sudo vim /etc/nginx/conf.d/default.conf
```

### 생성된 default.conf에 다음 내용 추가

```bash
server {
    listen 80;
    server_name i8b108.p.ssafy.io;

    location / {
        proxy_pass localhost:9999;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
    }
}
```

### certbot 설치

```bash
$ sudo snap install certbot --classic

`certbot 1.32.2 from Certbot Project (certbot-eff✓) installed`
```

### certbot으로 키 발급받기

```bash
$ sudo certbot --nginx -d i8B108.p.ssafy.io

# 그 다음 자신이 인증 받는데 사용할 이메일을 입력하면 된다.
```

### 키 발급 후 변경된 Nginx 설정파일 모습

```bash
server {
    server_name i8B108.p.ssafy.io;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/i8b108.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/i8b108.p.ssafy.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = i8b108.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name i8B108.p.ssafy.io;
    return 404; # managed by Certbot

}
```

### Crontab으로 SSL인증서 자동 갱신 설정

```bash
$ crontab -e

no crontab for ubuntu - using an empty one

Select an editor.  To change later, run 'select-editor'.
  1. /bin/nano        <---- easiest
  2. /usr/bin/vim.basic
  3. /usr/bin/vim.tiny
  4. /bin/ed

Choose 1-4 [1]:
```

### 파일 마지막에 다음과 같이 추가

```bash
0 0 * * * certbot renew --post-hook "sudo service nginx reload"
```

### https 연결 확인 모습

![0](https://i.imgur.com/yFusYSN.png)
<br/>

# Nginx Reverse Proxy 설정 및 Timezone 설정

### Nginx 설정파일 열기

```bash
$ sudo vim /etc/nginx/conf.d/default.conf
```

### default.conf에 다음 내용 추가

```
server {
    #name of the server
    server_name i8b108.p.ssafy.io;

    # listening port
    listen 443 ssl; # managed by Certbot

    # ssl keys
    ssl_certificate     /etc/letsencrypt/live/i8b108.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/i8b108.p.ssafy.io/privkey.pem; # managed by Certbot
    include             /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    # proxy pass of '/' request
    location / {
        # front index page name
        proxy_pass http://127.0.0.1:3000;

        charset utf-8;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;

        # front static resource location
        # root /var/www/html;
    }

    # proxy pass of '/api' request
    location /api {
        proxy_pass http://127.0.0.1:9999;
        # proxy_redirect off;
        charset utf-8;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
    }

    # proxy pass of swagger-ui
    location ~* ^/(swagger-ui|v3/api-docs) {
        proxy_pass http://127.0.0.1:9999;
        proxy_redirect off;
        charset utf-8;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
    }
}

server {
    listen 80;

    if ($host = i8b108.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    return 404; # managed by Certbot
}
```

## 서버 Timezone KST로 설정

### 타임존 변경하기(Asia/Seoul)

```bash
# 현재 시간 보기
$ date

# 현재 타임존 확인
$ more /etc/timezone

# 타임존 변경
$ sudo dpkg-reconfigure tzdata
```

이 GUI 메뉴에서 자신의 타임존을 찾아 변경한 뒤 재부팅 또는 원격 재접속을 하면 된다.

![1](https://i.imgur.com/IMT1w07.png)
<br/>

# Ubuntu 포트 방화벽 설정

### Port 설정

EC2 보안그룹 또는 UFW를 사용하여 포트 규칙을 정해줘야 한다.

- 인바운드
    - TCP
        
        ```bash
        # 관리자 ssh 연결
        22 
        
        # OpenVidu 서버와 application 이 기본적으로 publishing에 사용할 포트
        443
        
        # 만약 설치 단계에서 내 머신이 이미 https 프로토콜로 통신하고 있다면 이 포트가 OpenVidu 환경 구성에 사용됨
        80 
        
        # STUN/TURN 서버 통신에 사용될 포트
        3478
        
        # OpenVidu가 포함하고 있는 Kurento Media Server가 미디어 연결을 생성하기 위해 사용될 포트
        40000 - 57000
        
        # OpenVidu가 포함하고 있는 TURN 서버가 미디어 릴레이 연결을 하기 위해 사용될 포트
        57001 - 65535
        ```
        
    - UDP
        
        ```bash
        # STUN/TURN 서버 통신에 사용될 포트
        3478
        
        # OpenVidu가 포함하고 있는 Kurento Media Server가 미디어 연결을 생성하기 위해 사용될 포트
        40000 - 57000
        
        # OpenVidu가 포함하고 있는 TURN 서버가 미디어 릴레이 연결을 하기 위해 사용될 포트
        57001 - 65535
        ```
        

```bash
$ sudo ufw enable 

$ sudo ufw allow 22

$ sudo ufw allow http

$ sudo ufw allow https

$ sudo ufw allow 8080

$ sudo ufw allow 8443

$ sudo ufw allow 3478

$ sudo ufw allow 40000:57000/tcp

$ sudo ufw allow 40000:57000/udp

$ sudo ufw allow 57001:65535/tcp

$ sudo ufw allow 57001:65535/udp
```

### 포트 방화벽 설정 후 모습

```bash
$ sudo ufw status

Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
3478                       ALLOW       Anywhere
40000:57000/tcp            ALLOW       Anywhere
40000:57000/udp            ALLOW       Anywhere
57001:65535/tcp            ALLOW       Anywhere
57001:65535/udp            ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
8443/tcp                   ALLOW       Anywhere
8080/tcp                   ALLOW       Anywhere
22/tcp (v6)                ALLOW       Anywhere (v6)
443/tcp (v6)               ALLOW       Anywhere (v6)
3478 (v6)                  ALLOW       Anywhere (v6)
40000:57000/tcp (v6)       ALLOW       Anywhere (v6)
40000:57000/udp (v6)       ALLOW       Anywhere (v6)
57001:65535/tcp (v6)       ALLOW       Anywhere (v6)
57001:65535/udp (v6)       ALLOW       Anywhere (v6)
80/tcp (v6)                ALLOW       Anywhere (v6)
8443/tcp (v6)              ALLOW       Anywhere (v6)
8080/tcp (v6)              ALLOW       Anywhere (v6)
3306/tcp (v6)              ALLOW       Anywhere (v6)
```
<br/>

---

# OpenVidu CE On-Premise용 Deployment Platform 설치

## 0. 사전 작업

### Port Already-in use 에러 사전 방지

OpenVidu 를 받기 전에 nginx가 머신에 설치되어 있으면 에러가 발생하기 때문에 Nginx는 꺼놓은 뒤 작업을 진행한다.

```bash
$ sudo systemctl stop nginx
```

## 1. OpenVidu 설치

### 관리자 계정으로 전환

OpenVidu는 `/opt` 폴더에 설치하는 것을 권장한다.

```bash
# /opt 폴더로 이동
$ cd opt
```

### OpenVidu 받아오기

```bash
# 최신 버전
$ curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash

# 특정 버전을 설치하려면 latest 대신 해당 버전 숫자를 넣으면 된다.
# e.g. curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_2.25.0.sh | bash
```

## 2. OpenVidu 서버 초기 실행

### 환경변수파일 설정

```bash
$ cd /opt/openvidu

$ sudo vim .env
```

### 다음과 같이 환경변수 값 변경

```bash
DOMAIN_OR_PUBLIC_IP=i8b108.p.ssafy.io
OPENVIDU_SECRET=studify
CERTIFICATE_TYPE=letsencrypt
LETSENCRYPT_EMAIL=soulb9@naver.com
```

### OpenVidu서버 실행

```bash
$ ./openvidu start
```

- 성공 시 결과

### 추가 설정(포트 변경 및 기능 설정)을 위해 OpenVidu 중지

```bash
$ ./openvidu stop

$ sudo vim .env
```

### 다음과 같이 포트 및 환경변수 값 지정

```bash
HTTP_PORT=8080
HTTPS_PORT=8443
SUPPORT_DEPRECATED_API=true
WORKER_CONNECTIONS=10240\
JAVA_OPTIONS=-Xms2048m -Xmx4096m -Duser.timezone=KST
```

### OpenVidu서버 다시 실행

```bash
$ ./openvidu start
```

### Nginx 재실행

```bash
$ sudo systemctl start nginx
```
<br/>

---

# Docker로 MySQL DB 서버 실행

### 데이터베이스 운영 전략

- MySQL 8 버전
- 도커 컨테이너로 함께 관리
- 관리자 권한이 아닌 유저 권한으로 데이터베이스 접속
- 한글과 이모지 저장을 위해 characterset을 `utf8mb4`로 지정
- 컨테이너가 예기치 못하게 날아가서 데이터가 유실되는 것을 막기 위해 docker host인 ec2에 데이터를 저장
    - Docker volume 사용

### 데이터 증발을 막기 위해 컨테이너와 마운트할 Docker Volume 생성

```bash
$ sudo docker volume create mysql-data

```

### 도커 컨테이너 실행

```bash
$ sudo docker run --name studify-mysql-container \
  -d -p 3306:3306 \
	-e MYSQL_ROOT_PASSWORD=1q2w3e4r \
	-e MYSQL_DATABASE=studify \
	-e MYSQL_USER=developer \
	-e MYSQL_PASSWORD=i8b108t \
	--mount source=mysql-data,target=/var/lib/mysql \
  mysql:latest \
  --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_unicode_ci
```

## 🚨한글 및 이모지 저장이 안될 경우🚨

### 한글 설정을 위해 컨테이너 내부 설정파일 변경

```bash
# 컨테이너 내부로 진입
$ docker exec -it studify-mysql-container bash

# 한글 설정하기
$ cat << 'EOF' > /etc/mysql/conf.d/utf8.cnf
[client]
default-character-set = utf8mb4 

[mysqld] 
init_connect = SET collation_connection = utf8_general_ci 
init_connect = SET NAMES utf8mb4
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

[mysqldump]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4
EOF

$ cd /etc

$ echo -e "
[client]\n
default-character-set=utf8mb4\n
[mysql]\n
default-character-set=utf8mb4\n
[mysqld]\n
collation-server = utf8mb4_unicode_ci\n
init-connect='SET NAMES utf8mb4'\n
character-set-server = utf8mb4\n" >> my.cnf
```

### MySQL 서버에 접속해 character set 직접 지정하기

```bash
# 로그인
$ mysql -u root -p

# 이후 비밀번호 입력
```

```sql
# 데이터베이스 character set 직접 변경
ALTER DATABASE studify CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 테이블 character set 직접 변경
ALTER TABLE study CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 특정 칼럼의 character set 직접 변경하기

```sql
SHOW CREATE TABLE study;
ALTER TABLE study MODIFY COLUMN title VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE study MODIFY COLUMN description LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
<br/>

---

# 젠킨스를 사용해 프론트엔드 & 백엔드 배포하기

## Jenkins 도커 컨테이너로 설치

### Dockerfile 작성

```bash
FROM jenkins/jenkins:lts

RUN useradd -m jenkins

RUN echo "jenkins:jenkins" | chpasswd

USER jenkins

# docker 설치
RUN apt-get update && \
 apt-get -y install apt-transport-https \
 ca-certificates \
 curl \
 gnupg2 \
 zip \
 unzip \
 software-properties-common && \
curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && \
 add-apt-repository \
 "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
 $(lsb_release -cs) \
 stable" && \
 apt-get update && \
 apt-get -y install docker-ce

 # docker-compose 설치
 RUN curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose && \
    ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### docker-compose.yml 작성

```bash
version: '3.7'

services:
  jenkins:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: 'jenkins_docker'
    restart: always
    user: root
    ports:
      - '9090:8080'
      - '50000:50000'
    volumes:
      - '/path/to/jenkins_home:/var/jenkins_home'
      - '/var/run/docker.sock:/var/run/docker.sock'
```

### docker compose 실행

```bash
$ docker compose up -d
```

## 젠킨스 서버에 백엔드 빌드를 위한 Gradle 7.6 설치

```bash
# Gradle Releases에서 다운로드
$ wget https://services.gradle.org/distributions/gradle-7.6-bin.zip -P /tmp

# 압축 풀기
$ sudo unzip -d /opt/gradle /tmp/gradle-7.6-bin.zip

# 링크 연결하기
$ sudo ln -s /opt/gradle/gradle-7.6 /opt/gradle/latest
```
### 터미널에서 gradle을 입력했을 때 위에서 설치한 버전으로 연결하기

```bash
$ sudo vim /etc/profile.d/gradle.sh

# 다음 내용 입력하고 저장
export GRADLE_HOME=/opt/gradle/latest
export PATH=${GRADLE_HOME}/bin:${PATH}

# 스크립트에 Executable 권한을 부여
$ sudo chmod +x /etc/profile.d/gradle.sh

# 스크립트 로딩 (나중에 버전이 다시 내려갔다면 여기부터 입력하면 된다.)
$ source /etc/profile.d/gradle.sh

# 버전 확인
$ gradle -v
```
<br/>

## 젠킨스 서버 설정

### 서버로 진입(https://공개IP:9090)

```bash
# 공개IP 확인하기
$ curl ifconfig.me
```

### secret token 입력하기

```bash
# 로그를 확인하여 secret token 값을 확인하고, 이 값을 젠킨스 서버 입력창에 입력해 로그인
$ docker logs jenkins_docker
```

### 관리자 계정 설정 후 플러그인 추가

### 1. Jenkins 관리 선택

![2](https://i.imgur.com/tvxzwDo.png)

### 2. 플러그인 관리 선택

![Untitled 3](https://i.imgur.com/NadTlXw.png)

### 3. Available plugins 선택

![Untitled 4](https://i.imgur.com/VWpXA8B.png)

### 4. gitlab/docker 관련 플러그인 설치

![Untitled 5](https://i.imgur.com/4fMdjei.png)

![Untitled 6](https://i.imgur.com/7brumeB.png)

### 설치 후 Dashboard로 돌아가서, New Item > Freestyle project 선택 > OK

![Untitled 7](https://i.imgur.com/HXJe0Rb.png)

# 자동 배포 설정하기

### General 설정 - 설명 추가

![Untitled 8](https://i.imgur.com/IlIXWYj.png)

### 소스코드 관리 설정

- Git 선택
    
![Untitled 9](https://i.imgur.com/4LsEfer.png)    
- Branch 지정 (자동 빌드가 발생할 브랜치)
    
![Untitled 10](https://i.imgur.com/OHdnpTC.png)    

### 빌드 유발 설정

- Build when a change is pushed to GitLab. GitLab webhook URL 선택
    
![Untitled 11](https://i.imgur.com/CtXfHmV.png)    
- 고급 설정에서 token 발행
    
![Untitled 12](https://i.imgur.com/mr5jSf9.png)    

### Build Steps 설정

- Add build step 에서 Execute shell 선택
    
![Untitled 13](https://i.imgur.com/ESniPqZ.png)    
- 빌드에 필요한 스크립트들 작성
    
    ```bash
    echo -e "\n\n\n========== Building STUDIFY backend... =========\n\n\n"
    cd /var/jenkins_home/workspace/studify/backend
    echo -e "# DB\nspring.datasource.url=jdbc:mysql://studify-mysql-container:3306/studify?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul&zeroDateTimeBehavior=convertToNull&rewriteBatchedStatements=true\nspring.datasource.username=developer\nspring.datasource.password=i8b108t\n\n# Mail\nspring.mail.host=smtp.naver.com\nspring.mail.port=465\nspring.mail.username=studify-support@naver.com\nspring.mail.password=didos9430! \n\n# jwt\njwt.secret=dyAeHubOOc8KaOfYB6XEQoEj1QzRlVgtjNL8PYs1A1tymZvvqkcEU7L1imkKHeDa\njwt.expiration=1800000\n" | tee src/main/resources/application-local.properties
    ./gradlew build
    docker rm -f studify-backend
    docker rmi studify-backend:latest
    docker build -t studify-backend -f ./Dockerfile .
    docker run --name studify-backend \
    	-p 9999:8080 \
    	--link studify-mysql-container:mysql \
    	-d studify-backend:latest
    
    echo -e "\n\n\n========== STUDIFY backend Successfully Deployed ==========\n\n\n"
    
    echo -e "\n\n\n========== Building STUDIFY frontend... ==========\n\n\n"
    cd /var/jenkins_home/workspace/studify/frontend
    docker rm -f studify-frontend
    docker rmi studify-frontend:latest
    docker build -t studify-frontend -f ./Dockerfile .
    docker run --name studify-frontend \
    	-d -it \
        -v /var/www/html:/app/build \
        studify-frontend:latest
    
    echo -e "\n\n\n========== STUDIFY frontend Successfully Deployed ==========\n\n\n"
    ```
    

# 젠킨스에서 바로 빌드하기

### 저장하고 생성된 프로젝트를 선택하여 지금 빌드 선택, 테스트하기

보통 처음에 shell 내용을 `docker ps` 나 `ls -al`을 입력해놓고 테스트를 한다.

![Untitled 14](https://i.imgur.com/GxmgUai.png)
# Gitlab Webhook 연결하여 배포 자동화

### Gitlab > Settings > Webhooks

![Untitled 15](https://i.imgur.com/SQr5Rm8.png)
- `URL`에는 `빌드 유발` 설정에서 봤던 GitLab webhook URL 입력
- `Secret token`에는 `빌드 유발` 설정 고급에서 Generate를 클릭해 생성한 토큰값 입력
- 필요한 체크박스를 선택하고 Add webhook 선택
    - 생성된 Project Hooks에서 Test 를 해볼 수 있다.
        ![Untitled 16](https://i.imgur.com/qPUWFyv.png)
