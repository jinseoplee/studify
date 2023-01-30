package com.ssafy.api.service;

import com.ssafy.api.request.study.StudyCreatePostReq;
import com.ssafy.api.response.study.StudyCreatePostRes;

public interface StudyService {

    /**
     * 스터디 생성
     *
     * @param studyCreatePostReq
     * @return
     */
    StudyCreatePostRes createStudy(StudyCreatePostReq studyCreatePostReq);

    /**
     * 스터디 삭제
     *
     * @param studyId
     */
    void deleteStudy(Long studyId);

}
