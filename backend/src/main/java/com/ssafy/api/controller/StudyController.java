package com.ssafy.api.controller;

import com.ssafy.api.request.study.StudyCreatePostReq;
import com.ssafy.api.request.study.StudyInfoUpdatePutReq;
import com.ssafy.api.response.study.StudyDetailRes;
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
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

/**
 * 스터디 관련 API 요청 처리를 위한 컨트롤러 정의
 */
@CrossOrigin("*")
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
    @ApiResponse(responseCode = "200", description = "스터디 생성 성공")
    @PostMapping
    public ResponseEntity<? extends BaseResponse> createStudy(@AuthenticationPrincipal String email,
                                                              @RequestBody StudyCreatePostReq studyCreatePostReq) {
        return ResponseEntity.ok(new BaseResponse<StudyRes>(200, "스터티 생성 완료", studyService.createStudy(email, studyCreatePostReq)));
    }

    /**
     * 스터디 참여 API([POST] /api/v1/studies/{studyId})
     */
    @Operation(summary = "스터디 참여")
    @ApiResponse()
    @PostMapping("/{studyId}")
    public ResponseEntity<? extends BaseResponse> joinStudy(@AuthenticationPrincipal String email,
                                                            @PathVariable Long studyId) {
        return ResponseEntity.ok(new BaseResponse<StudyRes>(200, "스터디 참여 완료", studyService.joinStudy(email, studyId)));
    }

    /**
     * 스터디 가입 여부 확인 API([POST] /api/v1/studies/check
     */
    @Operation(summary = "스터디 참여 여부")
    @PostMapping("/check")
    public ResponseEntity<? extends BaseResponseBody> checkStudyMember(@AuthenticationPrincipal String email,
                                                                       @RequestBody Map<String, String> param) {
        studyService.checkStudyMember(email, Long.parseLong(param.get("studyId")));
        return ResponseEntity.ok(new BaseResponseBody(200, "참여할 수 있는 스터디입니다."));
    }

    /**
     * 스터디 나가기 API([DELETE] /api/v1/studies/leave/{studyId})
     */
    @Operation(summary = "스터디 나가기")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스터디 떠나기 성공"),
            @ApiResponse(responseCode = "400", description = "존재하지 않는 리소스 접근")
    })
    @DeleteMapping("/leave/{studyId}")
    public ResponseEntity<? extends BaseResponseBody> leaveStudy(@AuthenticationPrincipal String email,
                                                                 @PathVariable Long studyId) {
        studyService.leaveStudy(email, studyId);
        return ResponseEntity.ok(new BaseResponseBody(200, "스터디 떠나기 완료"));
    }

    /**
     * 스터디 목록 조회 API([GET] /api/v1/studies)
     */
    @Operation(summary = "스터디 목록 조회")
    @ApiResponse(responseCode = "200", description = "스터디 목록 조회 성공")
    @GetMapping
    public ResponseEntity<? extends BaseResponse> findByCondition(@RequestParam(required = false) List<String> category,
                                                                  @RequestParam(required = false) Integer generation,
                                                                  @RequestParam(required = false) String region,
                                                                  @RequestParam(name = "classnum", required = false) Integer classNum,
                                                                  @RequestParam(name = "ispublic", required = false) Boolean isPublic) {
        return ResponseEntity.ok(new BaseResponse<List<StudyRes>>(200, "스터디 목록 조회 성공",
                studyService.findByCondition(category, generation, region, classNum, isPublic)));
    }

    /**
     * 스터디 조회 API([GET] /api/v1/studies)
     */
    @Operation(summary = "스터디 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스터디 조회 성공"),
            @ApiResponse(responseCode = "400", description = "존재하지 않는 리소스 접근")
    })
    @GetMapping("/{studyId}")
    public ResponseEntity<? extends BaseResponse> findByUserId(@PathVariable Long studyId) {
        return ResponseEntity.ok(new BaseResponse<StudyDetailRes>(200, "스터디 조회 성공", studyService.findByStudyId(studyId)));
    }

    /**
     * 스터디 수정 API([PUT] /api/v1/studies/{studyId})
     */
    @Operation(summary = "스터디 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스터디 수정 성공"),
            @ApiResponse(responseCode = "400", description = "존재하지 않는 리소스 접근"),
            @ApiResponse(responseCode = "403", description = "권한이 없는 접근")
    })
    @PutMapping("/{studyId}")
    public ResponseEntity<? extends BaseResponse> updateStudyInfo(@AuthenticationPrincipal String email,
                                                                  @PathVariable Long studyId,
                                                                  @RequestBody StudyInfoUpdatePutReq studyInfoUpdatePutReq) {
        return ResponseEntity.ok(new BaseResponse<StudyRes>(200, "스터디 수정 완료",
                studyService.updateStudyInfo(email, studyId, studyInfoUpdatePutReq)));
    }

    /**
     * 스터디 삭제 API([DELETE] /api/v1/studies/{studyId})
     */
    @Operation(summary = "스터디 삭제")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스터디 삭제 성공"),
            @ApiResponse(responseCode = "400", description = "존재하지 않는 리소스 접근"),
            @ApiResponse(responseCode = "403", description = "권한이 없는 접근")
    })
    @DeleteMapping("/{studyId}")
    public ResponseEntity<BaseResponseBody> deleteStudy(@AuthenticationPrincipal String email,
                                                        @PathVariable Long studyId) {
        studyService.deleteStudy(email, studyId);
        return ResponseEntity.ok().body(new BaseResponseBody(200, "스터디 삭제 완료"));
    }

    /**
     * 스터디 이미지 업로드 API([POST] /api/v1/studies/image/{studyId})
     */
    @Operation(summary = "스터디 이미지 업로드")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스터디 이미지 업로드 성공"),
            @ApiResponse(responseCode = "400", description = "올바르지 않은 파일")
    })
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

    /**
     * 스터디 이미지 조회 API([GET] /api/v1/studies/image/{studyId})
     */
    @Operation(summary = "스터디 이미지 조회")
    @ApiResponse(responseCode = "200", description = "스터디 이미지 조회 성공")
    @GetMapping("/image/{studyId}")
    public ResponseEntity<?> getImage(@PathVariable Long studyId) throws IOException {
        StudyImg studyImg = studyService.getImage(studyId);
        Resource resource = new FileSystemResource(studyImg.getFileUrl());
        HttpHeaders header = new HttpHeaders();
        Path filePath = Paths.get(studyImg.getFileUrl());
        header.add("Content-Type", Files.probeContentType(filePath));

        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }

    /**
     * 스터디 이미지 수정 API([PUT] /api/v1/studies/image/{studyId})
     */
    @Operation(summary = "스터디 이미지 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스터디 이미지 수정 성공"),
            @ApiResponse(responseCode = "400", description = "올바르지 않은 파일")
    })
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

    /**
     * 스터디 이미지 삭제 API([DELETE] /api/v1/studies/image/{studyId})
     */
    @Operation(summary = "스터디 이미지 삭제")
    @ApiResponse(responseCode = "200", description = "스터디 이미지 삭제 성공")
    @DeleteMapping("/image/{studyId}")
    public ResponseEntity<BaseResponseBody> deleteImage(@PathVariable Long studyId) {
        studyService.deleteImage(studyId);
        return ResponseEntity.ok().body(new BaseResponseBody(200, "스터디 이미지 삭제 성공"));
    }

}
