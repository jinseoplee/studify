package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class UserStudy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Study study;

    public static UserStudy of(User user, Study study) {
        UserStudy userStudy = new UserStudy();
        userStudy.setUser(user);
        userStudy.setStudy(study);
        return userStudy;
    }

}
