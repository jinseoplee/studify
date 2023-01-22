package com.ssafy.db.repository;

import com.ssafy.db.entity.Profile;
import com.ssafy.db.entity.TempUser;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUser(User user);

}
