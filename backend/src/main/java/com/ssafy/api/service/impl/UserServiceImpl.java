package com.ssafy.api.service.impl;

import com.ssafy.api.request.UserAuthPostReq;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserSignupPostReq;
import com.ssafy.api.response.UserAuthPostRes;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.api.util.FileValidator;
import com.ssafy.api.util.MailDispatcher;
import com.ssafy.config.security.JwtTokenProvider;
import com.ssafy.db.entity.TempUser;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.TempUserRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.UUID;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의
 */
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final TempUserRepository tempUserRepository;
    private final MailDispatcher mailDispatcher;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public User createUser(TempUser tempUser) {
        User user = User.builder()
                .email(tempUser.getEmail())
                .name(tempUser.getName())
                .password(tempUser.getPassword())
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
    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
    }

    @Transactional
    public boolean checkDuplicate(String email) {
        if (userRepository.existsByEmail(email))
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");

        return true;
    }


    @Override
    public TempUser sendAuthMail(UserAuthPostReq req) throws MessagingException {
        String code = UUID.randomUUID().toString();
        /* 현재 시간 생성 */
        String content = mailDispatcher.buildAuthMailContent(req.getName(), req.getDomain(), code);
        System.out.println(content);

        /* 메일 전송 */
        mailDispatcher.sendMail(req.getEmail(), "Studify 회원가입 인증", content);

        return TempUser.builder()
                .email(req.getEmail())
                .password(req.getPassword())
                .name(req.getName())
                .nickname(req.getNickname())
                .code(code)
                .build();
    }

    @Transactional
    @Override
    public UserAuthPostRes insertTempUser(TempUser tempUser) {
        tempUser.setPassword(passwordEncoder.encode(tempUser.getPassword()));

        tempUserRepository.save(tempUser);

        return UserAuthPostRes.builder()
                .statusCode(202)
                .message("Accepted")
                .code(tempUser.getCode())
                .build();
    }

    @Transactional
    @Override
    public TempUser certificateTempUser(UserSignupPostReq authReq) {
        return tempUserRepository.findByCode(authReq.getCode())
                .orElseThrow(() -> new IllegalArgumentException("만료된 페이지거나 인증 대상이 존재하지 않습니다."));
    }

    @Override
    public User updateUserPassword(Map<String, String> userInfo) {
        User user = userRepository.findByEmail(userInfo.get("email"))
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        user.updatePassword(passwordEncoder.encode(userInfo.get("password")));

        return userRepository.save(user);
    }


    @Override
    public void deleteUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        userRepository.deleteById(user.getId());
    }

    @Override
    public void deleteTempUser(String email) {
        TempUser tempUser = tempUserRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("인증 대상이 존재하지 않습니다."));

        tempUserRepository.deleteById(email);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean validImgFile(MultipartFile multipartFile) {
        try (InputStream inputStream = multipartFile.getInputStream()) {
            if (!multipartFile.isEmpty()) {
                boolean isValid = FileValidator.validImgFile(inputStream);
                if (!isValid) {
                    return false;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return true;
    }

}
