package com.ssafy.db.repository;

import com.ssafy.db.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 스터디 모델 관련 데이터베이스 쿼리 생성을 위한 JPA Query Method 인터페이스 정의
 */
public interface StudyRepository extends JpaRepository<Study, Long> {

    /**
     * 기수를 입력받아 스터디 조회
     */
    List<Study> findByGeneration(Integer generation);

}
