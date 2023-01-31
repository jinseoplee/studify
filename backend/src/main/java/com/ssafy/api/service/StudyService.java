package com.ssafy.api.service;

import com.ssafy.api.response.study.StudyCreatePostRes;

/**
 * 스터디 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의
 */
public interface StudyService {

    /**
     * 스터디 생성
     *
     * @param studyCreatePostReq
     * @return StudyRes
     */
    StudyCreatePostRes createStudy(com.ssafy.api.request.study.StudyCreatePostReq studyCreatePostReq);

}
