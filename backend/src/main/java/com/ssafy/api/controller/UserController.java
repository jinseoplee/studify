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

import javax.mail.MessagingException;
import java.time.LocalDateTime;

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
     * 회원가입 요청을 받아 인증 이메일을 전송합니다.
     * @param UserAuthMailPostReq: 사용자의 회원가입정보와 메일 템플릿
     * @return
     */
//    @PostMapping("/auth/mail")
//    public ResponseEntity<? extends BaseResponseBody> createUser(@RequestBody UserAuthMailPostReq authMailPostReq) {
////        User user = userService.createUser(userRegisterPostReq)
//
//        Register data = Register.builder()
//                .userAuthMailPostReq(authMailPostReq)
//                .certified()
//                .mailSentAt()
//                .build();
//
//        try {
//            /* 메일 전송 */
//            emailService.sendMail(authMailPostReq.getEmail(), authMailPostReq.getSubject(), emailService.buildMailContent()); // 메일 전송
//
//            /* register table에 정보 저장(email, password, name, certified, mailSendAt */
//
//        } catch (MessagingException e) { // 메일 전송 실패
//
//        } catch (Exception e) { // db 저장 실패??
//
//        }
//
//        /* 프론트에 응답 전송 */
//        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
//    }

    /**
     * @param email
     * @return
     */
    @GetMapping("{email}")
    public ResponseEntity<? extends BaseResponseBody> getUser(@PathVariable String email) {
        User user = userService.getUser(email);

        /* 있으면 200, 없으면 400 */
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }

    /**
     *
     * @param userRegisterAuthReq
     * @return
     */
    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> get(@RequestBody UserRegisterPostReq userRegisterAuthReq) {
        /* register 테이블이랑 비교!
            - mailSendAt 값을 비교해서
                같으면 pass
                다르면 예외

            - certified 값을 비교해서
                같으면 pass
                다르면 예외
         */

        /* user 테이블에 register 테이블에 있는 유저정보 추가 */

        /* 추가가 완료되었으면 200 */

        return null;
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
