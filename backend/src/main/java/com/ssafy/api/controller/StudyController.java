package com.ssafy.api.controller;

import com.ssafy.api.request.study.StudyCreatePostReq;
import com.ssafy.api.request.study.StudyInfoUpdatePutReq;
import com.ssafy.api.response.study.StudyRes;
import com.ssafy.api.service.StudyService;
import com.ssafy.common.model.response.BaseResponse;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.StudyImg;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * 스터디 관련 API 요청 처리를 위한 컨트롤러 정의
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/studies")
public class StudyController {

    private final Logger LOGGER = LoggerFactory.getLogger(StudyController.class);
    private final StudyService studyService;

    /**
     * 스터디 생성 API([POST] /api/v1/studies)
     */
    @Operation(summary = "스터디 생성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스터디 생성 성공")
    })
    @PostMapping
    public ResponseEntity<? extends BaseResponse> createStudy(@RequestBody StudyCreatePostReq studyCreatePostReq) {
        return ResponseEntity.ok(new BaseResponse<StudyRes>(200, "스터티 생성 완료", studyService.createStudy(studyCreatePostReq)));
    }

    @PutMapping("/{studyId}")
    public ResponseEntity<StudyRes> updateStudyInfo(@PathVariable Long studyId, @RequestBody StudyInfoUpdatePutReq studyInfoUpdatePutReq) {
        LOGGER.info("[updateStudyInfo] studyId : {}", studyId);
        LOGGER.info("[updateStudyInfo] studyInfoUpdatePutReq : {}", studyInfoUpdatePutReq);

        return ResponseEntity.ok().body(studyService.updateStudyInfo(studyId, studyInfoUpdatePutReq));
    }

    @DeleteMapping("/{studyId}")
    public ResponseEntity<BaseResponseBody> deleteStudy(@PathVariable Long studyId) {
        LOGGER.info("[deleteStudy] studyId : {}", studyId);

        studyService.deleteStudy(studyId);

        return ResponseEntity.ok().body(new BaseResponseBody(200, "Success"));
    }

    /* 스터디 생성 후 이미지 업로드 */
    @PostMapping("/image/{studyId}")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile multipartFile, @PathVariable Long studyId) throws IOException {
        StudyImg studyImg = studyService.uploadImage(multipartFile);
        if (studyImg != null) {
            Study study = studyService.getStudy(studyId);
            study.setStudyImg(studyImg);
            studyService.updateStudy(study);
            return ResponseEntity.ok().body(new BaseResponseBody(200, "스터디 이미지 업데이트 성공"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseBody(400, "올바른 이미지 파일이 아닙니다"));
    }

    /* 스터디 이미지 수정 */
    @PutMapping("/image/{studyId}")
    public ResponseEntity<?> updateImage(@RequestParam("image") MultipartFile multipartFile, @PathVariable Long studyId) throws IOException {
        Study study = studyService.getStudy(studyId);
        StudyImg studyImg = studyService.updateImage(multipartFile, study);
        if (studyImg != null) {
            study.setStudyImg(studyImg);
            studyService.updateStudy(study);
            return ResponseEntity.ok().body(new BaseResponseBody(200, "스터디 이미지 업데이트 성공"));
        }
        return ResponseEntity.badRequest().body(new BaseResponseBody(400, "올바른 이미지 파일이 아닙니다"));
    }

    /* 스터디 이미지 삭제(default) */
    @DeleteMapping("/image/{studyId}")
    public ResponseEntity<BaseResponseBody> deleteImage(@PathVariable Long studyId) {
        studyService.deleteImage(studyId);
        return ResponseEntity.ok().body(new BaseResponseBody(200, "스터디 이미지 삭제 성공"));
    }

}