package com.ssafy.db.repository;

import com.ssafy.db.entity.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {

    Optional<UserBadge> findByUserIdAndBadgeId(Long userId, Long badgeId);

    List<UserBadge> findAllByBadgeId(Long badgeId);

    List<UserBadge> findAllByUserId(Long userId);

    boolean existsByUserIdAndBadgeId(Long userId, Long badgeId);

}
