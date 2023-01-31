package com.ssafy.common.model.response;

import lombok.Getter;

/**
 * 서버 요청에대한 기본 응답값(바디) 정의.
 */
@Getter
public class BaseResponseBody {
    
    private Integer statusCode = null;
    private String message = null;

    public BaseResponseBody() {
    }

    public BaseResponseBody(Integer statusCode) {
        this(statusCode, null);
    }

    public BaseResponseBody(Integer statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

}
