package com.ssafy.api.service.impl;

import com.ssafy.api.response.study.StudyCreatePostRes;
import com.ssafy.api.service.StudyService;
import com.ssafy.db.entity.Study;
import com.ssafy.db.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * 스터디 관련 비즈니스 로직 처리를 위한 서비스 구현 정의
 */
@RequiredArgsConstructor
@Service
public class StudyServiceImpl implements StudyService {

    private final Logger LOGGER = LoggerFactory.getLogger(StudyServiceImpl.class);
    private final StudyRepository studyRepository;

    @Override
    public StudyCreatePostRes createStudy(com.ssafy.api.request.study.StudyCreatePostReq studyCreatePostReq) {
        Study study = studyRepository.save(studyCreatePostReq.toEntity());

        LOGGER.info("[createStudy] created study : {}", study);

        StudyCreatePostRes studyRes = StudyCreatePostRes.builder()
                .statusCode(200)
                .message("Success")
                .study(study)
                .build();

        return studyRes;
    }

    @Override
    public void deleteStudy(Long studyId) {
        studyRepository.deleteById(studyId);

        LOGGER.info("[deleteStudy] study({}) has been deleted", studyId);
    }

}
