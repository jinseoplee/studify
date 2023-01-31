package com.ssafy.api.controller;

import com.ssafy.api.request.study.StudyCreatePostReq;
import com.ssafy.api.request.study.StudyInfoUpdatePutReq;
import com.ssafy.api.response.study.StudyCreatePostRes;
import com.ssafy.api.response.study.StudyRes;
import com.ssafy.api.service.StudyService;
import com.ssafy.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<StudyCreatePostRes> createStudy(@RequestBody StudyCreatePostReq studyCreatePostReq) {
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

}