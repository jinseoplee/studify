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

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "code")
    private String code;

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    @Builder
    public TempUser(String email, String password, String name, String nickname, String code) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.code = code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
