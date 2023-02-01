package com.ssafy.api.controller;

import com.ssafy.api.service.UserImgService;
import com.ssafy.api.service.UserService;
import com.ssafy.api.service.impl.StudyServiceImpl;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserImg;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의
 */
@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final UserImgService userImgService;

    @GetMapping("/{id}")
    public ResponseEntity<? extends BaseResponseBody> getUser(@PathVariable Long id) {
        User user = userService.getUser(id);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }

    @PutMapping("/pass")
    public ResponseEntity<? extends BaseResponseBody> updateUserPassword(@RequestBody Map<String, String> userInfo) {
        userService.updateUserPassword(userInfo);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200,"Success"));
    }

    @DeleteMapping("/withdraw/{email}")
    public ResponseEntity<? extends BaseResponseBody> deleteUser(@PathVariable String email) {
        userService.deleteUser(email);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }


    /* 프로필 이미지 업로드 */
    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile multipartFile, @RequestParam Long userId) throws IOException {
        if(userService.validImgFile(multipartFile)) {
            UserImg userImg = userImgService.uploadImage(multipartFile);
            User user = userService.getUser(userId);
            user.setUserImg(userImg);
            userService.updateUser(user);
            return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Fail"));
    }

    /* 프로필 이미지 수정 */
    @PutMapping("/image")
    public ResponseEntity<?> updateImage(@RequestParam("image") MultipartFile multipartFile, @RequestParam Long userId) throws IOException {
        if(userService.validImgFile(multipartFile)) {
            User user = userService.getUser(userId);
            userImgService.updateImage(multipartFile, user);
            userService.updateUser(user);
            return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Fail"));
    }

    /* 프로필 이미지 삭제(default) */
    @DeleteMapping("/image/{userId}")
    public ResponseEntity<BaseResponseBody> deleteImage(@PathVariable Long userId){
        userImgService.deleteImage(userId);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }

}
