package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
@Table(name = "user_badge")
@Entity
public class UserBadge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_badge_id")
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "badge_id")
    private Badge badge;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDate date;

    public UserBadge(User user, Badge badge) {
        this.user = user;
        this.badge = badge;
        this.date = LocalDate.now();
    }
    
}
