package com.ssafy.db.repository;

import com.ssafy.db.entity.UserTimeLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;

public interface UserTimeLogRepository extends JpaRepository<UserTimeLog, Long> {

//    @Transactional
//    @Modifying
//    @Query(value = "insert into user_time_log (study_time, user_id) values (timediff(:endTime, :startTime), userId)", nativeQuery = true)
//    void insertUserTimeLog(@Param("endTime")LocalTime endTime, @Param("startTime") LocalTime startTime, @Param("userId") Long userId);
//

}
