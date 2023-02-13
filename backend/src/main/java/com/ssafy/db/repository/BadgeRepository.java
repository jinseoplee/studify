package com.ssafy.db.repository;

import com.ssafy.db.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Long> {

    Badge findByName(String name);

}