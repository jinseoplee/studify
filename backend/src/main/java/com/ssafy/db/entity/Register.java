package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.api.request.UserAuthMailPostReq;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Entity
public class Register {

    @Id
    @Column(nullable = false, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(name = "certified")
    private String certified;

    private Long mailSentAt;

    @Builder
    public Register(String email, String password, String name, String certified, Long mailSentAt) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.certified = certified;
        this.mailSentAt = mailSentAt;
    }
}
