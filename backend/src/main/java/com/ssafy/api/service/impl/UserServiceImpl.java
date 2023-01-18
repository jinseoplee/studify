package com.ssafy.api.service.impl;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.request.UserAuthMailPostReq;
import com.ssafy.api.service.UserService;
import com.ssafy.config.security.JwtTokenProvider;
import com.ssafy.db.entity.Register;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RegisterRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의
 */
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RegisterRepository registerRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public User createUser(Register register) {
        User user = User.builder()
                .email(register.getEmail())
                .name(register.getName())
                .password(passwordEncoder.encode(register.getPassword())) // 비밀번호를 암호화 하여 디비에 저장
                .build();

        return userRepository.save(user);
    }

    @Transactional
    @Override
    public UserLoginPostRes signin(UserLoginPostReq userLoginPostReq) {
        User user = userRepository.findByEmail(userLoginPostReq.getEmail()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

        // 비밀번호 비교 수행
        if (!passwordEncoder.matches(userLoginPostReq.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        UserLoginPostRes userLoginPostRes = UserLoginPostRes.builder()
                .statusCode(200)
                .message("Success")
                .token(jwtTokenProvider.createToken(userLoginPostReq.getEmail()))
                .email(user.getEmail())
                .name(user.getName())
                .build();

        return userLoginPostRes;
    }

    @Transactional
    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("없는 사용자입니다."));
    }


    @Transactional
    @Override
    public Register insertRegister(Register register) {
        return registerRepository.save(register);
    }

    @Transactional
    @Override
    public Register certificateRegister(UserRegisterPostReq registerAuthReq) {
        Register register = registerRepository.findByCertified(registerAuthReq.getCertified())
                .orElseThrow(() -> new IllegalArgumentException("없는 인증대상입니다."));

        if(!register.getMailSentAt().equals(registerAuthReq.getMailSentAt())) { return null; }
        if(!register.getCertified().equals(registerAuthReq.getCertified())) { return null; }

        return register;
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
