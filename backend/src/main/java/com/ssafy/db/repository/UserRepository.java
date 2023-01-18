package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * 유저 모델 관련 데이터베이스 쿼리 생성을 위한 JPA Query Method 인터페이스 정의
 */
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * 이메일을 입력받아 사용자 정보 리턴
     *
     * @param email
     * @return 사용자 정보
     */
    Optional<User> findByEmail(String email);
}
