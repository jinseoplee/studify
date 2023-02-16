package com.ssafy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class StudifyApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudifyApplication.class, args);
    }

}
