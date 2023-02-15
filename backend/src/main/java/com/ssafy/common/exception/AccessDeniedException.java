package com.ssafy.common.exception;

/**
 * 스터디 수정, 삭제 API 요청시 생성자가 아닐때 접근을 거부하는 예외
 */
public class AccessDeniedException extends RuntimeException {

    public AccessDeniedException(String message) {
        super(message);
    }

}
