package com.ssafy.db.repository;

import com.ssafy.db.entity.Conference;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 스터디룸(화상회의) 모델 관련 데이터베이스 쿼리 생성을 위한 JPA Query Method 인터페이스 정의
 */
public interface ConferenceRepository extends JpaRepository<Conference, Long> {
}
