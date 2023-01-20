package com.ssafy.api.controller;

import com.ssafy.api.request.UserAuthMailPostReq;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.config.mail.MailDispatcher;
import com.ssafy.db.entity.Register;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users/auth")
public class AuthController {

    private final UserService userService;
    private final MailDispatcher mailDispatcher;

    @PostMapping("/signin")
    public ResponseEntity<UserLoginPostRes> signin(@RequestBody UserLoginPostReq userLoginPostReq) {
        UserLoginPostRes userLoginPostRes = userService.signin(userLoginPostReq);
        return ResponseEntity.status(200).body(userLoginPostRes);
    }

    @PostMapping("/mail/register")
    public ResponseEntity<? extends BaseResponseBody> sendAuthMail(
            @RequestBody UserAuthMailPostReq req) throws Exception {

        String certificationCode = mailDispatcher.getCertificationCode();
        Long mailSentAt = System.currentTimeMillis();

        /* 현재 시간 생성 */
        String content = mailDispatcher.buildAuthMailContent(req.getName(), certificationCode, mailSentAt);

        /* 메일 전송 */
        mailDispatcher.sendMail(req.getEmail(), "Studify 회원가입 인증", content);

        Register register = Register.builder()
                .email(req.getEmail())
                .password(req.getPassword())
                .name(req.getName())
                .certified(certificationCode)
                .mailSentAt(mailSentAt)
                .build();

        userService.insertRegister(register);

        /* 프론트에 응답 전송 */
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }

    @PostMapping("/signup")
    public ResponseEntity<? extends BaseResponseBody> signUp(@RequestBody UserRegisterPostReq registerPostReq) {
        userService.createUser(userService.certificateRegister(registerPostReq));

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }
}
