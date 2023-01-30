package com.ssafy.api.controller;

import com.ssafy.api.request.study.StudyCreatePostReq;
import com.ssafy.api.response.study.StudyCreatePostRes;
import com.ssafy.api.service.StudyService;
import com.ssafy.common.model.response.BaseResponseBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/study")
public class StudyController {

    private final StudyService studyService;

    @PostMapping
    public ResponseEntity<StudyCreatePostRes> createStudy(@RequestBody StudyCreatePostReq studyCreatePostReq) {
        StudyCreatePostRes studyCreatePostRes = studyService.createStudy(studyCreatePostReq);
        return ResponseEntity.status(HttpStatus.CREATED).body(studyCreatePostRes);
    }

}