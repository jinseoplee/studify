package com.ssafy.api.request.study;

import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.User;
import lombok.Getter;

import java.util.List;

/**
 * 스터디 생성 API ([POST] /api/v1/studies) 요청에 필요한 리퀘스트 바디 정의
 */
@Getter
public class StudyCreatePostReq {

    private String title;

    private String description;

    private Integer capacity;

    private List<String> day;

    private List<String> category;

    private boolean isPublic;

    private Integer generation;

    private String region;

    private Integer classNum;

    public Study toEntity(User user) {
        return Study.builder()
                .title(title)
                .description(description)
                .capacity(capacity)
                .day(day)
                .category(category)
                .isPublic(isPublic)
                .generation(user.getGeneration())
                .region(user.getRegion())
                .classNum(user.getClassNum())
                .build();
    }

}