package com.ssafy.api.request.study;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

/**
 * 스터디 수정 API ([PUT] /api/v1/study/{studyId}) 요청에 필요한 리퀘스트 바디 정의
 */
@Getter
@Setter
@ToString
public class StudyInfoUpdatePutReq {

    private String title; // 스터디 제목

    private String description; // 스터디 설명

    private int capacity; // 인원

    private List<String> day; // 요일

    private List<String> category; // 카테고리

    private boolean isPublic; // 공개 여부

}
