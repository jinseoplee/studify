package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@Getter
@Entity
public class TempUser {

    @Id
    @Column(nullable = false, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer generation;

    @Column(nullable = false)
    private String region;

    @Column(nullable = false)
    private Integer classNum;

    @Column(name = "code")
    private String code;

    @Builder
    public TempUser(String email, String password, String name, Integer generation, String region, Integer classNum, String code) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.generation = generation;
        this.region = region;
        this.classNum = classNum;
        this.code = code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
