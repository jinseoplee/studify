package com.ssafy.api.service.impl;

import com.ssafy.api.request.UserAuthMailPostReq;
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
    public User createUser(UserAuthMailPostReq userRegisterPostReq) {
        User user = User.builder()
                .email(userRegisterPostReq.getEmail())
                .name(userRegisterPostReq.getName())
                .password(passwordEncoder.encode(userRegisterPostReq.getPassword())) // 비밀번호를 암호화 하여 디비에 저장
                .build();

        return userRepository.save(user);
    }

    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("없는 사용자입니다."));
    }
//    @Transactional
//    @Override
//    public User updateUser(UserUpdatePostReq userUpdatePostReq) {
//        User user = userRepository.findOne(????)
//                .orElseThrow(() -> new IllegalArgumentException("없는 사용자입니다."));
//
//        // 사용자의 프로필 이미지 정보를 업데이트하는 Setter 입니다.
//        // 업데이트 정책 지정 후 다시 정의해야 합니다.
//        user.update(userUpdatePostReq.getImgOrigin(), userUpdatePostReq.getImgSave());
//
//        return id;
//    }

//    @Transactional
//    @Override
//    public User profileImg(MultipartFile[] files) {
//        String imgOrigin = StringUtils.cleanPath()
//    }
}
