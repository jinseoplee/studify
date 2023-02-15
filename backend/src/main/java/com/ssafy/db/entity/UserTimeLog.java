package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Entity
public class UserTimeLog {
    @Id
    @Column(name = "user_time_log_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate day;

    @Column(nullable = false)
    private Long studyTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public UserTimeLog(LocalDate day, Long studyTime, User user) {
        this.day = day;
        this.studyTime = studyTime;
        this.user = user;
    }

    public void setStudyTime(long studyTime) {
        this.studyTime = studyTime;
    }

}
