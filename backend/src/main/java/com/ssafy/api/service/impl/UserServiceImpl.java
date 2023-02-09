package com.ssafy.api.service.impl;

import com.ssafy.api.request.user.UserAuthPostReq;
import com.ssafy.api.request.user.UserDetailPutReq;
import com.ssafy.api.request.user.UserLoginPostReq;
import com.ssafy.api.request.user.UserSignupPostReq;
import com.ssafy.api.response.user.UserAuthPostRes;
import com.ssafy.api.response.user.UserInfoRes;
import com.ssafy.api.response.user.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.util.FileValidator;
import com.ssafy.common.util.MailDispatcher;
import com.ssafy.config.security.JwtTokenProvider;
import com.ssafy.db.entity.TempUser;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserImg;
import com.ssafy.db.entity.UserTimeLog;
import com.ssafy.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의
 */
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;
    private final TempUserRepository tempUserRepository;
    private final MailDispatcher mailDispatcher;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final UserImgRepository userImgRepository;
    private final UserTimeLogRepository userTimeLogRepository;
    private final UserStudyRepository userStudyRepository;
    private final String path = "C:\\Users\\images\\users";

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

    /**
     * 로그인
     */
    @Transactional
    @Override
    public UserLoginPostRes signIn(UserLoginPostReq userLoginPostReq) {
        // 회원가입한 이메일인지 확인
        User user = userRepository.findByEmail(userLoginPostReq.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

        // 비밀번호 일치 확인
        if (!passwordEncoder.matches(userLoginPostReq.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        UserLoginPostRes userLoginPostRes = UserLoginPostRes.builder()
                .statusCode(200)
                .message("success")
                .token(jwtTokenProvider.createToken(userLoginPostReq.getEmail()))
                .build();

        LOGGER.info("[signIn] {}", userLoginPostReq.getEmail());

        return userLoginPostRes;
    }

    @Transactional
    public User getUser(String email) {
        return userRepository.findByEmail(email)
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


    /**
     * 사용자 정보 조회
     */
    @Override
    public UserInfoRes findByEmail(String email) {
        User foundUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        UserInfoRes userInfoRes = new UserInfoRes(foundUser);
        userInfoRes.setStudies(userStudyRepository.findAllByUserId(foundUser.getId()));
        return userInfoRes;
    }


    /* 사용자 정보 수정 */
    @Override
    public User updateUserDetail(UserDetailPutReq userDetailPutReq, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        user.setName(userDetailPutReq.getName());
        user.setClassNum(userDetailPutReq.getClassNum());
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

    /* 프로필 이미지 관련하여 사용 - 수정할 예정 */
    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    /* 이미지 파일 검증 */
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

    /* 프로필 이미지 조회 */
    @Override
    public UserImg getImage(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        UserImg userImg = (user.getUserImg() != null) ? userImgRepository.findById(user.getUserImg().getId()).get() : null;
        if (userImg == null) {
            userImg = UserImg.builder()
                    .name("default.png")
                    .type("image/png")
                    .fileUrl("./src/main/resources/static/images/default.png")
                    .build();
        }
        return userImg;
    }

    /* 프로필 이미지 업로드 */
    public UserImg uploadImage(MultipartFile multipartFile) throws IOException {
        UUID uuid = UUID.randomUUID();
        String fileUrl = path + uuid.toString() + "_" + multipartFile.getOriginalFilename();
        UserImg userImg = userImgRepository.save(
                UserImg.builder()
                        .name(multipartFile.getOriginalFilename())
                        .type(multipartFile.getContentType())
                        .fileUrl(fileUrl)
                        .build()
        );
        multipartFile.transferTo(new File(fileUrl));

        return userImg;
    }

    /* 프로필 이미지 수정 */
    public UserImg updateImage(MultipartFile multipartFile, User user) throws IOException {
        UUID uuid = UUID.randomUUID();
        String filePath = path + uuid.toString() + "_" + multipartFile.getOriginalFilename();

        UserImg userImg = userImgRepository.findById(user.getUserImg().getId()).get();

        File file = new File(userImg.getFileUrl());
        file.delete();

        userImg.updateUserImg(multipartFile, filePath);
        userImgRepository.save(userImg);
        multipartFile.transferTo(new File(filePath));

        return userImg;
    }

    /* 프로필 이미지 삭제 */
    public void deleteImage(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        UserImg userImg = userImgRepository.findById(user.getUserImg().getId()).get();

        user.setUserImg(null);
        File file = new File(userImg.getFileUrl());
        file.delete();

        userImgRepository.deleteById(userImg.getId());
    }

    /* 사용자 공부 시간 기록 생성 */
    @Override
    public UserTimeLog createUserTimeLog(LocalDate day, Long diff, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        // 누적 공부 시간 계산
        user.setTotalTime(user.getTotalTime() + diff);
        return userTimeLogRepository.save(
                UserTimeLog.builder()
                        .day(day)
                        .studyTime(diff)
                        .user(user)
                        .build()
        );
    }

    /* 사용자 공부 시간 기록 수정 */
    @Override
    public UserTimeLog updateUserTimeLog(LocalDate day, Long diff, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        UserTimeLog savedUserTimeLog = userTimeLogRepository.findByUserAndDay(user, day).orElseThrow(() -> new IllegalArgumentException("공부 기록이 존재하지 않습니다."));
        savedUserTimeLog.setStudyTime(savedUserTimeLog.getStudyTime() + diff);
        // 누적 공부 시간 계산
        user.setTotalTime(user.getTotalTime() + diff);
        return userTimeLogRepository.save(savedUserTimeLog);
    }

    /* 사용자 랭킹 집계 및 조회 */
    @Override
    public List<User> findAllUserRank() {
        return userRepository.findAll(Sort.by(Sort.Direction.DESC, "totalTime"));
    }

}
