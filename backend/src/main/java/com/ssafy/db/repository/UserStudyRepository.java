package com.ssafy.db.repository;

import com.ssafy.db.entity.UserStudy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserStudyRepository extends JpaRepository<UserStudy, Long> {

    List<UserStudy> findAllByStudyId(Long studyId);

}
