package com.ssafy.api.request;

import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의
 */
@Setter
public class UserRegisterPostReq {

    private String email;
    private String password;
    private String name;

}
