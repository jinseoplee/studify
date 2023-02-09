FROM openjdk:8-jdk-slim

EXPOSE 8080

COPY ./build/libs/studify-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
