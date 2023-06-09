package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserTimeLog;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserTimeLogRepository extends JpaRepository<UserTimeLog, Long> {
    Optional<UserTimeLog> findByUserAndDay(User user, LocalDate day);

    List<UserTimeLog> findAllByUser(User user);

    List<UserTimeLog> findAllByUser(User user, Sort sort);

    boolean existsByUserAndDay(User user, LocalDate day);

}
