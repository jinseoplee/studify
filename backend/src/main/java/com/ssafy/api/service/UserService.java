package com.ssafy.api.service;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.db.entity.Register;
import com.ssafy.db.entity.User;

import java.util.Map;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의
 */
public interface UserService {

    /**
     * 회원가입
     *
     * @param userRegisterPostReq
     * @return
     */
    User createUser(Register register);

    /**
     * 로그인
     * @param userLoginPostReq
     * @return
     */
    UserLoginPostRes signin(UserLoginPostReq userLoginPostReq);

    /**
     * 유저 조회
     * @param email
     * @return
     */
    User getUser(String email);

    /**
     * 임시회원 삽입
     * @param register
     * @return
     */
    Register insertRegister(Register register);

    /**
     * 사용자 메일 인증 확인
     * @param registerAuthReq
     * @return
     */
    Register certificateRegister(UserRegisterPostReq registerAuthReq);

    /**
     * 회원정보 변경
     * @param userInfo
     * @return
     */
    User updateUserInfo(Map<String, String> userInfo);
}
