FROM openjdk:8-jdk-slim

EXPOSE 8080

RUN mkdir src && cd src && mkdir img && cd img && mkdir profile && mkdir study
RUN cd /

COPY ./src/main/resources/static/images/default.png /src/img/profile/

COPY ./build/libs/studify-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
