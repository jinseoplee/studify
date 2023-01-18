package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserRegisterPostReq {
    private String certified; // 랜덤문자열이 인코딩된 코드
    private Long mailSentAt; // 메일이 전송된 시각
}
