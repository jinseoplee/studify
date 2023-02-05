package com.ssafy.api.service;

import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.StudyImg;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StudyImgService {

    /**
     * 스터디 썸네일 이미지 업로드
     */
    StudyImg uploadImage(MultipartFile multipartFile) throws IOException;

    /**
     * 스터디 썸네일 이미지 수정
     */
    StudyImg updateImage(MultipartFile multipartFile, Study study) throws IOException;

    /**
     * 스터디 썸네일 이미지 삭제
     */
    void deleteImage(Long studyId);

}
