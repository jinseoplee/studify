package com.ssafy.api.controller;

import com.ssafy.api.request.study.StudyCreatePostReq;
import com.ssafy.api.request.study.StudyInfoUpdatePutReq;
import com.ssafy.api.response.study.StudyCreatePostRes;
import com.ssafy.api.response.study.StudyRes;
import com.ssafy.api.service.StudyImgService;
import com.ssafy.api.service.StudyService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.StudyImg;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * 스터디 관련 API 요청 처리를 위한 컨트롤러 정의
 */
@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/study")
public class StudyController {

    private final Logger LOGGER = LoggerFactory.getLogger(StudyController.class);
    private final StudyService studyService;
    private final StudyImgService studyImgService;

    /**
     * 스터디 생성
     */
    @PostMapping
    public ResponseEntity<StudyCreatePostRes> createStudy(@AuthenticationPrincipal String email, @RequestBody StudyCreatePostReq studyCreatePostReq) {
        LOGGER.info("[createStudy] studyCreatePostReq : {}", studyCreatePostReq);

        return ResponseEntity.status(HttpStatus.OK).body(studyService.createStudy(studyCreatePostReq));
    }

    @PutMapping("/{studyId}")
    public ResponseEntity<StudyRes> updateStudyInfo(@PathVariable Long studyId, @RequestBody StudyInfoUpdatePutReq studyInfoUpdatePutReq) {
        LOGGER.info("[updateStudyInfo] studyId : {}", studyId);
        LOGGER.info("[updateStudyInfo] studyInfoUpdatePutReq : {}", studyInfoUpdatePutReq);

        return ResponseEntity.status(HttpStatus.OK).body(studyService.updateStudyInfo(studyId, studyInfoUpdatePutReq));
    }

    @DeleteMapping("/{studyId}")
    public ResponseEntity<BaseResponseBody> deleteStudy(@PathVariable Long studyId) {
        LOGGER.info("[deleteStudy] studyId : {}", studyId);

        studyService.deleteStudy(studyId);

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }

    /* 스터디 썸네일 이미지 업로드 */
    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile multipartFile, @RequestParam Long studyId) throws IOException {
        if (studyService.validImgFile(multipartFile)) {
            StudyImg studyImg = studyImgService.uploadImage(multipartFile);
            Study study = studyService.getStudy(studyId);
            study.setStudyImg(studyImg);
            studyService.updateStudy(study);
            return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Fail"));
    }

    /* 스터디 썸네일 이미지 수정 */
    @PutMapping("/image")
    public ResponseEntity<?> updateImage(@RequestParam("image") MultipartFile multipartFile, @RequestParam Long studyId) throws IOException {
        if (studyService.validImgFile(multipartFile)) {
            Study study = studyService.getStudy(studyId);
            studyImgService.updateImage(multipartFile, study);
            studyService.updateStudy(study);
            return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Fail"));
    }

    /* 스터디 썸네일 이미지 삭제(default) */
    @DeleteMapping("/image/{studyId}")
    public ResponseEntity<BaseResponseBody> deleteImage(@PathVariable Long studyId) {
        studyImgService.deleteImage(studyId);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseBody(200, "Success"));
    }

}