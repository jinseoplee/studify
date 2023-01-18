package com.ssafy.api.service;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.response.UserRes;
import com.ssafy.db.entity.User;

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
    User createUser(UserRegisterPostReq userRegisterPostReq);

    /**
     * 로그인
     * @param userLoginPostReq
     * @return
     */
    UserLoginPostRes signin(UserLoginPostReq userLoginPostReq);

}
