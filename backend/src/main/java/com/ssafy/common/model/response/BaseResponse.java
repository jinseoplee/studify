package com.ssafy.common.model.response;

import lombok.Getter;

/**
 * 서버 요청에 대한 기본 응답값(바디) 정의.
 */
@Getter
public class BaseResponse<T> {

    private int statusCode;

    private String message;

    private T content;

    public BaseResponse() {
    }

    public BaseResponse(int statusCode) {
        this(statusCode, null, null);
    }

    public BaseResponse(int statusCode, String message) {
        this(statusCode, message, null);
    }

    public BaseResponse(int statusCode, String message, T content) {
        this.statusCode = statusCode;
        this.message = message;
        this.content = content;
    }

}
