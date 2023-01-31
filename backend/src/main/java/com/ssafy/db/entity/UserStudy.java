package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class UserStudy {

    @Id
    @Column(name = "user_study_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;

    public static UserStudy of(User user, Study study) {
        UserStudy userStudy = new UserStudy();
        userStudy.setUser(user);
        userStudy.setStudy(study);
        return userStudy;
    }

}
