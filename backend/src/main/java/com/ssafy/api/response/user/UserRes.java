package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import lombok.Getter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth/signin) 요청에 대한 응답값 정의
 */
@Getter
public class UserRes extends BaseResponseBody {

    private String email;
    private String name;

    public UserRes(Integer statusCode, String message, User user) {
        super(statusCode, message);
        this.email = user.getEmail();
        this.name = user.getName();
    }

}
