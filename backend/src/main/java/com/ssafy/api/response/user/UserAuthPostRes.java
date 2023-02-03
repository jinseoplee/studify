package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Builder;

public class UserAuthPostRes extends BaseResponseBody {
    private String code;

    @Builder
    public UserAuthPostRes(Integer statusCode, String message, String code) {
        super(statusCode, message);
        this.code = code;
    }

}
