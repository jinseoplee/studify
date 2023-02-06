package com.ssafy.api.request.study;

import com.ssafy.db.entity.Study;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 스터디 생성 API ([POST] /api/v1/studies) 요청에 필요한 리퀘스트 바디 정의
 */
@Getter
@Setter
public class StudyCreatePostReq {

    private String title;

    private String description;

    private int capacity;

    private List<String> day;

    private List<String> category;

    private boolean isPublic;

    public Study toEntity() {
        return Study.builder()
                .title(title)
                .description(description)
                .capacity(capacity)
                .day(day)
                .category(category)
                .isPublic(isPublic)
                .build();
    }

}