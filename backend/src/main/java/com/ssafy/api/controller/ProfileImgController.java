package com.ssafy.api.controller;

import com.ssafy.api.service.ProfileImgService;
import com.ssafy.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class ProfileImgController {

    private final ProfileImgService profileImgService;

    /* 프로필 이미지 업로드 */
    @PostMapping("/profile/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile multipartFile, @RequestParam String email) throws IOException {
        String uploadImage = profileImgService.uploadImage(multipartFile, email);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    /* 프로필 이미지 수정 */
    @PutMapping("/profile/update")
    public ResponseEntity<?> updateImage(@RequestParam("image") MultipartFile multipartFile, @RequestParam String email) throws IOException {
        String uploadImage = profileImgService.updateImage(multipartFile, email);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    /* 프로필 이미지 삭제(default) */
    @DeleteMapping("/profile/delete/{email}")
    public ResponseEntity<BaseResponseBody> deleteImage(@PathVariable String email){
        profileImgService.deleteImage(email);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }

}