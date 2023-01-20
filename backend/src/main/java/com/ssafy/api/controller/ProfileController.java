package com.ssafy.api.controller;

import com.ssafy.api.service.ProfileService;
import com.ssafy.api.service.impl.ProfileServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class ProfileController {

    private final ProfileService profileService;

    /* 프로필 이미지 업로드 */
    @PostMapping("/profile/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile multipartFile) throws IOException {
        String uploadImage = profileService.uploadImage(multipartFile);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    /* 프로필 이미지 다운로드
    @GetMapping("/profile/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable("fileName") String fileName) throws IOException {
        byte[] downloadImage = profileService.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(downloadImage);
    }
     */

}