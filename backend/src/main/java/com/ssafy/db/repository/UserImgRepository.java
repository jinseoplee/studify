package com.ssafy.db.repository;

import com.ssafy.db.entity.UserImg;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserImgRepository extends JpaRepository<UserImg, Long> {
}
