package com.ssafy.api.service;

import com.ssafy.api.request.user.UserAuthPostReq;
import com.ssafy.api.request.user.UserLoginPostReq;
import com.ssafy.api.request.user.UserSignupPostReq;
import com.ssafy.api.response.user.UserAuthPostRes;
import com.ssafy.api.response.user.UserLoginPostRes;
import com.ssafy.db.entity.TempUser;
import com.ssafy.db.entity.User;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.util.Map;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의
 */
public interface UserService {

    /**
     * 회원인증 완료 후 가입
     * @param tempUser
     * @return
     */
    User createUser(TempUser tempUser);

    /**
     * 로그인
     * @param userLoginPostReq
     * @return
     */
    UserLoginPostRes signIn(UserLoginPostReq userLoginPostReq);

    /**
     * 유저 조회
     * @param id
     * @return
     */
    User getUser(Long id);

    /**
     * 인증메일 발송
     * @param req
     * @return
     */
    TempUser sendAuthMail(UserAuthPostReq req) throws MessagingException;

    /**
     * 임시회원 삽입
     * @param tempUser
     * @return
     */
    UserAuthPostRes insertTempUser(TempUser tempUser);

    /**
     * 사용자 메일 인증 확인
     * @param authReq
     * @return
     */
    TempUser certificateTempUser(UserSignupPostReq authReq);

    /**
     * 회원 비밀번호 변경
     * @param userInfo
     * @return
     */
    User updateUserPassword(Map<String, String> userInfo);

    /**
     * 회원정보 삭제
     * @param email
     */
    void deleteUser(String email);

    void deleteTempUser(String email);

    boolean checkDuplicate(String email);

    User updateUser(User user);

    boolean validImgFile(MultipartFile multipartFile);
}
