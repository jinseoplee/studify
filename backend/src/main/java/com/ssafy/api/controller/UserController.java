package com.ssafy.api.controller;

import com.ssafy.api.request.UserAuthMailPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.service.EmailService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Register;
import com.ssafy.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/auth/mail")
    public ResponseEntity<? extends BaseResponseBody> sendAuthMail(
            @RequestBody UserAuthMailPostReq authMailPostReq) throws Exception {

        String certificationCode = emailService.getCertificationCode();
        Long mailSentAt = System.currentTimeMillis();

        /* 현재 시간 생성 */
        String content = emailService.buildMailContent(authMailPostReq.getContent(), certificationCode, mailSentAt);

        /* 메일 전송 */
        emailService.sendMail(
                authMailPostReq.getEmail(),
                authMailPostReq.getSubject(),
                content);

        Register register = Register.builder()
                .email(authMailPostReq.getEmail())
                .password(authMailPostReq.getPassword())
                .name(authMailPostReq.getName())
                .certified(certificationCode)
                .mailSentAt(mailSentAt)
                .build();
//'didos9430@gmail.com', '$2a$10$vDKmQ5HXOmytEu4N3KhO4OqjZH4x.9F83zXzqQmSS20LSfzqjjFeK', '1674065673789', '이방환', '12341234'
        /* register table에 정보 저장(email, password, name, certified, mailSendAt */
        userService.insertRegister(register);

        /* 프론트에 응답 전송 */
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }

    @GetMapping("/{email}")
    public ResponseEntity<? extends BaseResponseBody> getUser(@PathVariable String email) {
        User user = userService.getUser(email);

        /* 있으면 200, 없으면 400 */
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }

    @PostMapping("/cert")
    public ResponseEntity<? extends BaseResponseBody> signUp(@RequestBody UserRegisterPostReq registerPostReq) {
        Register register = userService.certificateRegister(registerPostReq);

        userService.createUser(register);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }

    /**
     * 사용자의 계정 정보를 변경합니다.
     * @param userUpdatePostReq
     * @return
     */
//    @PostMapping
//    public ResponseEntity<? extends BaseResponseBody> updateUser(@RequestBody UserRegisterPutReq userUpdatePostReq) {
//        User user = userService.updateUser(userUpdatePostReq);
//
//        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200,"Success"));
//    }

    // 이메일 관련 기능이 와야 함
}
