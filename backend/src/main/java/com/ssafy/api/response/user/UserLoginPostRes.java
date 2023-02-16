package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Builder;
import lombok.Getter;

/**
 * 로그인 API ([POST] /api/v1/users/auth/signin) 요청에 대한 응답값 정의
 */
@Getter
public class UserLoginPostRes extends BaseResponseBody {

    private String token;

    @Builder
    public UserLoginPostRes(Integer statusCode, String message, String token) {
        super(statusCode, message);
        this.token = token;
    }

}
