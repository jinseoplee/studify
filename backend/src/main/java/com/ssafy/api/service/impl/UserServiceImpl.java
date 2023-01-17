package com.ssafy.api.service.impl;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의
 */
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User createUser(UserRegisterPostReq userRegisterPostReq) {
        User user = User.builder()
                .email(userRegisterPostReq.getEmail())
                .name(userRegisterPostReq.getName())
                .password(passwordEncoder.encode(userRegisterPostReq.getPassword())) // 비밀번호를 암호화 하여 디비에 저장
                .build();

        return userRepository.save(user);
    }

}
