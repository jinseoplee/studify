package com.ssafy.db.repository;

import com.ssafy.db.entity.StudyCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyCategoryRepository extends JpaRepository<StudyCategory, Long> {
}
