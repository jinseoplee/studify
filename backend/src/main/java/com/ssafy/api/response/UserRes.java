package com.ssafy.api.response;

import lombok.Getter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users) 요청에 대한 응답값 정의
 */
@Getter
public class UserRes {

    private String message;

}
