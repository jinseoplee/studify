package com.ssafy.api.controller;

import com.ssafy.api.response.user.UserImgRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserImg;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    @GetMapping("/{email}")
    public ResponseEntity<? extends BaseResponseBody> getUser(@PathVariable String email) {
        User user = userService.getUser(email);

        return ResponseEntity.ok().body(new BaseResponseBody(200, "Success"));
    }

    @PutMapping("/pass")
    public ResponseEntity<? extends BaseResponseBody> updateUserPassword(@RequestBody Map<String, String> userInfo) {
        userService.updateUserPassword(userInfo);

        return ResponseEntity.ok().body(new BaseResponseBody(200, "Success"));
    }

    @DeleteMapping("/withdraw/{email}")
    public ResponseEntity<? extends BaseResponseBody> deleteUser(@PathVariable String email) {
        userService.deleteUser(email);

        return ResponseEntity.ok().body(new BaseResponseBody(200, "Success"));
    }

    @GetMapping("/image")
    public ResponseEntity<?> getImage(@AuthenticationPrincipal String email) throws IOException {
        UserImg userImg = userService.getImage(email);
        Resource resource = new FileSystemResource(userImg.getFileUrl());

        // 로컬 서버에 저장된 이미지가 있는 경우 로직 처리
        HttpHeaders header = new HttpHeaders();
        Path filePath = null;
        try {
            filePath = Paths.get(userImg.getFileUrl());
            // 인풋으로 들어온 파일명 .png / .jpg 에 맞게 헤더 타입 설정
            header.add("Content-Type", Files.probeContentType(filePath));
        }
        catch (Exception e){
            e.printStackTrace();
        }

        // 이미지 리턴 실시 [브라우저에서 get 주소 확인 가능]
        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }

    /* 프로필 이미지 업로드 */
    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@AuthenticationPrincipal String email,
                                         @RequestParam("image") MultipartFile multipartFile) throws IOException {
        if (userService.validImgFile(multipartFile)) {
            User user = userService.getUser(email);
            UserImg userImg = userService.uploadImage(multipartFile);
            user.setUserImg(userImg);
            userService.updateUser(user);
            return ResponseEntity.ok().body(new BaseResponseBody(200, "프로필 이미지 업로드 성공"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseBody(400, "올바른 이미지 파일이 아닙니다"));
    }

    /* 프로필 이미지 수정 */
    @PutMapping("/image")
    public ResponseEntity<?> updateImage(@AuthenticationPrincipal String email,
                                         @RequestParam("image") MultipartFile multipartFile) throws IOException {
        if (userService.validImgFile(multipartFile)) {
            User user = userService.getUser(email);
            userService.updateImage(multipartFile, user);
            userService.updateUser(user);
            return ResponseEntity.ok().body(new BaseResponseBody(200, "프로필 이미지 업데이트 성공"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseBody(200, "올바른 이미지 파일이 아닙니다"));
    }

    /* 프로필 이미지 삭제(default) */
    @DeleteMapping("/image")
    public ResponseEntity<BaseResponseBody> deleteImage(@AuthenticationPrincipal String email) {
        userService.deleteImage(email);
        return ResponseEntity.ok().body(new BaseResponseBody(200, "프로필 이미지 삭제 성공"));
    }

}
