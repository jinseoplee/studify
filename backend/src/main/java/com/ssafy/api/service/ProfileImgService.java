package com.ssafy.api.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProfileImgService {

    /**
     * 프로필 이미지 업로드
     */
    String uploadImage(MultipartFile multipartFile, String email) throws IOException;

    /**
     * 프로필 이미지 수정
     */
    String updateImage(MultipartFile multipartFile, String email) throws IOException;

    /**
     * 프로필 이미지 삭제
     */
    void deleteImage(String email);

}
