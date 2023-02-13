FROM openjdk:8-jdk-slim

EXPOSE 8080

RUN mkdir /src/img/profile
RUN mkdir /src/img/study

COPY ./build/libs/studify-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
