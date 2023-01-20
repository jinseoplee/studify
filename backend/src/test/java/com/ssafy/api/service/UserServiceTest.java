package com.ssafy.api.service;

import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest()
public class UserServiceTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @After
    public void cleanUp(){ }

    @Test
    public void UserSaveTest(){
        LocalDateTime now = LocalDateTime.of(2023, 1, 14, 0, 0, 0);
        userRepository.save(User.builder()
                .email("email")
                .password(passwordEncoder.encode("pass"))
                .name("name")
                .build());

        List<User> userList = userRepository.findAll();
        User user = userList.get(0);

        System.out.println(">>>>>> email=" + user.getEmail() + ", password=" + user.getPassword() + ", name=" + user.getName());
        System.out.println(">>>>>> createdAt=" + user.getCreatedAt() + ", updatedAt=" + user.getUpdatedAt());

        assertThat(user.getCreatedAt()).isAfter(now);
        assertThat(user.getUpdatedAt()).isAfter(now);
    }
}