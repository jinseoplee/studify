package com.ssafy.db.repository;

import com.ssafy.db.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    // Optional<Profile> findByName(String fileName);

}
