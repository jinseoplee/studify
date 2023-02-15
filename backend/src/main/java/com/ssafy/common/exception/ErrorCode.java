package com.ssafy.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * 예외 케이스를 관리하기 위한 에러 코드
 */
@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    /*
     * 400 BAD_REQUEST: 잘못된 요청
     */
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "invalid request"),

    /*
     * 401 UNAUTHORIZED: 인증되지 않은 사용자의 요청
     */
    UNAUTHORIZED_REQUEST(HttpStatus.UNAUTHORIZED, "unauthorized"),

    /*
     * 403 FORBIDDEN: 권한이 없는 사용자의 요청
     */
    FORBIDDEN_ACCESS(HttpStatus.FORBIDDEN, "forbidden"),

    /*
     * 404 NOT_FOUND: 리소스를 찾을 수 없음
     */
    NOT_FOUND(HttpStatus.NOT_FOUND, "not found"),

    /*
     * 405 METHOD_NOT_ALLOWED: 허용되지 않은 Request Method 호출
     */
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "not allowed method"),

    /*
     * 500 INTERNAL_SERVER_ERROR: 내부 서버 오류
     */
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "server error");

    private final HttpStatus httpStatus;
    private final String message;

}
