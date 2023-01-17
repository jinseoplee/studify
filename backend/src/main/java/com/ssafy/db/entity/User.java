package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * 유저 모델 정의
 */
@NoArgsConstructor
@Getter
@Entity
public class User extends BaseEntity {

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Builder
    public User(String email, String password, String name){
        this.email = email;
        this.password = password;
        this.name = name;
    }
}
