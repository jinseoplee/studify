package com.ssafy.api.service;

import com.ssafy.db.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProfileService {

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
    public void deleteImage(String email);

}
