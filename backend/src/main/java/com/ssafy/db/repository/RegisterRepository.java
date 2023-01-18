package com.ssafy.db.repository;

import com.ssafy.db.entity.Register;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegisterRepository extends JpaRepository<Register, String> {
    Optional<Register> findByCertified(String certified);
}