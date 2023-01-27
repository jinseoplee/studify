package com.ssafy.db.repository;

import com.ssafy.db.entity.ProfileImg;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileImgRepository extends JpaRepository<ProfileImg, Long> {
    Optional<ProfileImg> findByUser(User user);

}
