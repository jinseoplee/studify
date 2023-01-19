package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의
 */
@Getter
@Setter
public class UserAuthMailPostReq {

    private String email; // 이메일
    private String password; // 비밀번호
    private String name; // 이름
//    private String nickname;
}
