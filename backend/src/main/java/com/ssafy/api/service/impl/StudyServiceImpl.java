package com.ssafy.api.service.impl;

import com.ssafy.api.request.study.StudyCreatePostReq;
import com.ssafy.api.response.study.StudyCreatePostRes;
import com.ssafy.api.service.StudyService;
import com.ssafy.db.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StudyServiceImpl implements StudyService {

    private final StudyRepository studyRepository;

    @Override
    public StudyCreatePostRes createStudy(StudyCreatePostReq studyCreatePostReq) {
        return new StudyCreatePostRes(HttpStatus.CREATED.value(), "Success",
                studyRepository.save(studyCreatePostReq.toEntity()));
    }


}
