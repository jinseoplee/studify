package com.ssafy.db.repository;

import com.ssafy.db.entity.UserStudy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserStudyRepository extends JpaRepository<UserStudy, Long> {

    Optional<UserStudy> findByUserIdAndStudyId(Long userId, Long studyId);

    List<UserStudy> findAllByStudyId(Long studyId);

    List<UserStudy> findAllByUserId(Long userId);

    boolean existsByUserIdAndStudyId(Long userId, Long studyId);

    void deleteByStudyId(Long studyId);

}
