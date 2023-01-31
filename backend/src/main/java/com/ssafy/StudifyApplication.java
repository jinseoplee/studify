package com.ssafy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class StudifyApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudifyApplication.class, args);
    }

}
