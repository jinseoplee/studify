package com.ssafy.api.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProfileService {

    /**
     * 프로필 이미지 업로드
     */
    String uploadImage(MultipartFile multipartFile) throws IOException;

}
