package com.ssafy.api.response.study;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * 스터디 생성 API ([POST] /api/v1/study), 스터디 수정 API ([PUT] /api/v1/study/{studyId})
 * 요청에 대한 응답값 정의
 */
@Getter
public class StudyRes extends BaseResponseBody {

    private String title; // 스터디 제목

    private String description; // 스터디 설명

    private String host; // 스터디 주최자

    private int capacity; // 인원

    private List<String> day; // 요일

    private List<String> category; // 카테고리

    private boolean isPublic; // 공개 여부

    private List<User> users; // 스터디원

    @Builder
    public StudyRes(Integer statusCode, String message, Study study) {
        super(statusCode, message);
        this.title = study.getTitle();
        this.description = study.getDescription();
        this.capacity = study.getCapacity();
        this.day = study.getDay();
        this.isPublic = study.isPublic();
        this.users = null;
    }

}
