package com.ssafy.api.controller;

import com.ssafy.api.request.user.UserAuthPostReq;
import com.ssafy.api.request.user.UserLoginPostReq;
import com.ssafy.api.request.user.UserSignupPostReq;
import com.ssafy.api.response.user.UserAuthPostRes;
import com.ssafy.api.response.user.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.TempUser;
import com.ssafy.db.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users/auth")
public class AuthController {

    private final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);
    private final UserService userService;

    /**
     * 로그인 API([POST] /api/v1/users/auth/signin)
     */
    @Operation(summary = "로그인")
    @PostMapping("/signin")
    public ResponseEntity<? extends BaseResponseBody> signIn(@RequestBody UserLoginPostReq userLoginPostReq) {
        UserLoginPostRes userLoginPostRes = userService.signIn(userLoginPostReq);

        return ResponseEntity.status(HttpStatus.OK).body(userLoginPostRes);
    }

    /**
     * 사용자 메일 인증 API([POST] /api/v1/users/auth/mail/register)
     */
    @Operation(summary = "사용자 메일 인증")
    @PostMapping("/mail/register")
    public ResponseEntity<? extends BaseResponseBody> sendAuthMail(
            @RequestBody UserAuthPostReq req) throws Exception {
        // 중복 검사
        userService.checkDuplicate(req.getEmail());

        TempUser tempUser = userService.sendAuthMail(req);
        UserAuthPostRes userAuthPostRes = userService.insertTempUser(tempUser);

        return ResponseEntity.status(HttpStatus.OK).body(userAuthPostRes);
    }

    /**
     * 회원가입 API([POST] /api/v1/users/auth/signup)
     */
    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<? extends BaseResponseBody> signUp(@RequestBody UserSignupPostReq signupPostReq) {
        TempUser tempUser = userService.certificateTempUser(signupPostReq);
        User user = userService.createUser(tempUser);
        userService.deleteTempUser(tempUser.getEmail());
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(201, "Created"));
    }

}
