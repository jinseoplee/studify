package com.ssafy.api.service;

import com.ssafy.api.request.user.UserAuthPostReq;
import com.ssafy.api.request.user.UserDetailPutReq;
import com.ssafy.api.request.user.UserLoginPostReq;
import com.ssafy.api.request.user.UserSignupPostReq;
import com.ssafy.api.response.user.UserAuthPostRes;
import com.ssafy.api.response.user.UserInfoRes;
import com.ssafy.api.response.user.UserLoginPostRes;
import com.ssafy.db.entity.TempUser;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserImg;
import com.ssafy.db.entity.UserTimeLog;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의
 */
public interface UserService {

    /**
     * 회원인증 완료 후 가입
     */
    User createUser(TempUser tempUser);

    /**
     * 로그인
     */
    UserLoginPostRes signIn(UserLoginPostReq userLoginPostReq);

    /**
     * 사용자 조회
     */
    User getUser(String email);

    /**
     * 인증메일 발송
     */
    TempUser sendAuthMail(UserAuthPostReq req) throws MessagingException;

    /**
     * 임시회원 삽입
     */
    UserAuthPostRes insertTempUser(TempUser tempUser);

    /**
     * 사용자 메일 인증 확인
     */
    TempUser certificateTempUser(UserSignupPostReq authReq);

    /**
     * 사용자 정보 조회
     */
    UserInfoRes findByEmail(String email);

    /**
     * 사용자 비밀번호 변경
     */
    User updateUserPassword(Map<String, String> userInfo);

    /**
     * 사용자 정보 수정
     */
    User updateUserDetail(UserDetailPutReq userDetailPutReq, String email);

    /**
     * 사용자 정보 삭제
     */
    void deleteUser(String email);

    /**
     * 임시 사용자 정보 삭제
     */
    void deleteTempUser(String email);

    /**
     * 사용자 이메일 중복 확인
     */
    boolean checkDuplicate(String email);

    /**
     * 사용자 정보 수정(이미지 관련)
     */
    User updateUser(User user);

    /**
     * 이미지 파일 유효성 검사
     */
    boolean validImgFile(MultipartFile multipartFile);

    /**
     * 프로필 이미지 조회
     */
    UserImg getImage(String email);

    /**
     * 프로필 이미지 업로드
     */
    UserImg uploadImage(MultipartFile multipartFile) throws IOException;

    /**
     * 프로필 이미지 수정
     */
    UserImg updateImage(MultipartFile multipartFile, User user) throws IOException;

    /**
     * 프로필 이미지 삭제
     */
    void deleteImage(String email);

    /**
     * 사용자 공부 시간 기록 생성 및 수정
     */
    UserTimeLog updateUserTimeLog(LocalDate day, Long diff, String email);

    /**
     * 사용자 랭킹 집계(매일 0시 기준)
     */
    List<User> findAllUserRank();

    /**
     * 사용자 공부 기록 조회
     */
    List<UserTimeLog> getUserTimeLog(String email);

}
