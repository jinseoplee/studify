package com.ssafy.api.request.study;

import com.ssafy.db.entity.Study;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

/**
 * 스터디 생성 API ([POST] /api/v1/study) 요청에 필요한 리퀘스트 바디 정의
 */
@Setter
@ToString
public class StudyCreatePostReq {

    private String title; // 스터디 제목

    private String description; // 스터디 설명

    private String host; // 스터디 주최자

    private int capacity; // 인원

    private List<String> day; // 요일

    private List<String> category; // 카테고리

    private boolean isPublic; // 공개 여부

    public Study toEntity() {
        return Study.builder()
                .title(title)
                .description(description)
                .host(host)
                .capacity(capacity)
                .day(day)
                .isPublic(isPublic)
                .build();
    }

}