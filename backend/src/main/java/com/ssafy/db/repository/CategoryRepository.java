package com.ssafy.db.repository;

import com.ssafy.db.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findAllByStudyId(Long studyId);

    void deleteByStudyId(Long studyId);

}
