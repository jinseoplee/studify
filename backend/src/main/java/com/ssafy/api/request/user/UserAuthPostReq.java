package com.ssafy.api.request.user;

import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의
 */
@Getter
@Setter
public class UserAuthPostReq {

    private String email; // 이메일

    private String password; // 비밀번호

    private String generation; // 기수

    private String region; // 지역

    private String classNum; // 반

    private String name; // 이름

    private String domain; // 프론트 경로

}
