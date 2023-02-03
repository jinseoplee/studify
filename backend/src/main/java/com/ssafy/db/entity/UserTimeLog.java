package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

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
    private LocalTime study_time;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public void setUser(User user){
        this.user = user;
    }

}
