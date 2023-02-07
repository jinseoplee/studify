package com.ssafy.api.service;

import com.ssafy.api.request.study.StudyCreatePostReq;
import com.ssafy.api.request.study.StudyInfoUpdatePutReq;
import com.ssafy.api.response.study.StudyRes;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.StudyImg;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * 스터디 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의
 */
public interface StudyService {
    /**
     * 스터디 생성
     */
    StudyRes createStudy(String email, StudyCreatePostReq studyCreatePostReq);

    /**
     * 스터디 수정
     */
    StudyRes updateStudyInfo(String email, Long studyId, StudyInfoUpdatePutReq studyInfoUpdatePutReq);

    /**
     * 스터디 목록 조회
     */
    List<StudyRes> findAll();

    /**
     * 유저 기수에 해당하는 스터디 목록 조회
     */
    List<StudyRes> findByGeneration(String email);

    /**
     * 유저 지역에 해당하는 스터디 목록 조회
     */
    List<StudyRes> findByRegion(String email);

    /**
     * 스터디 조회
     */
    StudyRes findByStudyId(Long studyId);

    /**
     * 스터디 삭제
     */
    void deleteStudy(String email, Long studyId);

    boolean validImgFile(MultipartFile multipartFile);

    Study getStudy(Long studyId);

    Study updateStudy(Study study);

    /**
     * 스터디 이미지 조회
     */
    StudyImg getImage(Long studyId);

    /**
     * 스터디 이미지 업로드
     */
    StudyImg uploadImage(MultipartFile multipartFile) throws IOException;

    /**
     * 스터디 이미지 수정
     */
    StudyImg updateImage(MultipartFile multipartFile, Study study) throws IOException;

    /**
     * 스터디 이미지 삭제
     */
    void deleteImage(Long studyId);

}
