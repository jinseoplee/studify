package com.ssafy.api.controller;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserRegisterPutReq;
import com.ssafy.api.service.EmailService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final EmailService emailService;

    /**
     * 회원가입 요청을 받아 DB에 사용자를 추가합니다.
     * @param userRegisterPostReq
     * @return
     */
    @PostMapping("/signup")
    public ResponseEntity<? extends BaseResponseBody> createUser(@RequestBody UserRegisterPostReq userRegisterPostReq) {
        User user = userService.createUser(userRegisterPostReq);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }

    /**
     * 사용자의 계정 정보를 변경합니다.
     * @param userUpdatePostReq
     * @return
     */
    @PostMapping
    public ResponseEntity<? extends BaseResponseBody> updateUser(@RequestBody UserRegisterPutReq userUpdatePostReq) {
        User user = userService.updateUser(userUpdatePostReq);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200,"Success"));
    }

    // 이메일 관련 기능이 와야 함
}
