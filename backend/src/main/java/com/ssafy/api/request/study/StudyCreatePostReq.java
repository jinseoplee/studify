package com.ssafy.api.request.study;

import com.ssafy.db.entity.Study;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Setter
@ToString
public class StudyCreatePostReq {

    private String title; // 스터디 제목

    private String description; // 스터디 설명

    private int capacity; // 인원

    private List<String> day; // 요일

    private List<String> skill; // 기술

    private boolean isPublic; // 공개 여부

    public Study toEntity() {
        return Study.builder()
                .title(title)
                .description(description)
                .capacity(capacity)
                .day(day)
                .skill(skill)
                .isPublic(isPublic)
                .build();
    }

}