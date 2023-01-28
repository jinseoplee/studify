package com.ssafy.db.repository;

import com.ssafy.db.entity.TempUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TempUserRepository extends JpaRepository<TempUser, String> {
    Optional<TempUser> findByCode(String code);
}