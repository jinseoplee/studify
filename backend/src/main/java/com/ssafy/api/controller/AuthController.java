package com.ssafy.api.controller;

import com.ssafy.api.request.UserAuthPostReq;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserSignupPostReq;
import com.ssafy.api.response.UserAuthPostRes;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.api.util.MailDispatcher;
import com.ssafy.db.entity.TempUser;
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
            @RequestBody UserAuthPostReq req) throws Exception {

        TempUser tempUser = userService.sendAuthMail(req);
        UserAuthPostRes userAuthPostRes = userService.insertTempUser(tempUser);
        /* 프론트에 응답 전송 */
        return ResponseEntity.status(HttpStatus.OK).body(userAuthPostRes);
    }

    @PostMapping("/signup")
    public ResponseEntity<? extends BaseResponseBody> signUp(@RequestBody UserSignupPostReq registerPostReq) {
        userService.createUser(userService.certificateTempUser(registerPostReq));

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(201, "Created"));
    }

}
