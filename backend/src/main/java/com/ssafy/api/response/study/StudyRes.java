package com.ssafy.api.response.study;

import com.ssafy.db.entity.Study;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.List;

/**
 * 스터디 생성 API ([POST] /api/v1/study), 스터디 수정 API ([PUT] /api/v1/study/{studyId}) 요청에 대한 응답값 정의
 */
@Getter
public class StudyRes {

    @Schema(name = "스터디 id")
    private Long id;

    private String title; // 스터디 제목

    private String description; // 스터디 설명

    private String createdBy; // 스터디 생성자

    private int headcount; // 참여 인원

    private int capacity; // 정원

    private List<String> day; // 요일

    private List<String> category; // 카테고리

    private boolean isPublic; // 공개 여부

    public StudyRes(Study study) {
        this.id = study.getId();
        this.title = study.getTitle();
        this.description = study.getDescription();
        this.createdBy = study.getCreatedBy();
        this.headcount = study.getHeadcount();
        this.capacity = study.getCapacity();
        this.day = study.getDay();
        this.category = study.getCategory();
        this.isPublic = study.isPublic();
    }

}
