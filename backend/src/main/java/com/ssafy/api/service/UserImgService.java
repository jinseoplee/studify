package com.ssafy.api.service;

import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserImg;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserImgService {

    /**
     * 프로필 이미지 업로드
     */
    UserImg uploadImage(MultipartFile multipartFile) throws IOException;

    /**
     * 프로필 이미지 수정
     */
    UserImg updateImage(MultipartFile multipartFile, User user) throws IOException;

    /**
     * 프로필 이미지 삭제
     */
    void deleteImage(Long userId);

}
