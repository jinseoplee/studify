package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UserLoginPostRes extends BaseResponseBody {

    private String token;
    private String email;
    private String name;

    @Builder
    public UserLoginPostRes(Integer statusCode, String message, String token, String email, String name) {
        super(statusCode, message);
        this.token = token;
        this.email = email;
        this.name = name;
    }

}
