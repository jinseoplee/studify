package com.ssafy.db.repository;

import com.ssafy.db.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StudyRepository extends JpaRepository<Study, Long> {
}
