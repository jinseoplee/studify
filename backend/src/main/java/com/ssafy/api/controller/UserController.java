package com.ssafy.api.controller;

import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
//    private final EmailService emailService;

    @GetMapping("/{email}")
    public ResponseEntity<? extends BaseResponseBody> getUser(@PathVariable String email) {
        User user = userService.getUser(email);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }

    @PutMapping("/info")
    public ResponseEntity<? extends BaseResponseBody> updateUserInfo(@RequestParam Map<String, String> userInfo) {
        userService.updateUserInfo(userInfo);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200,"Success"));
    }

    @PutMapping("/pass")
    public ResponseEntity<? extends BaseResponseBody> updateUserPassword(@RequestParam Map<String, String> userInfo) {
        userService.updateUserPassword(userInfo);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200,"Success"));
    }

    @DeleteMapping("/email")
    public ResponseEntity<? extends BaseResponseBody> deleteUser(@PathVariable String email) {
        userService.deleteUser(email);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }

}
