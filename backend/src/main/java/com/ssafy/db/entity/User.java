package com.ssafy.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * 유저 모델 정의
 */
@Entity
public class User extends BaseEntity {

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

}
