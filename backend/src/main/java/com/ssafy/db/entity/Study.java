package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 스터디 모델 정의
 */
@NoArgsConstructor
@Getter
@ToString
@Entity
public class Study extends BaseEntity {

    @Id
    @Column(name = "study_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String thumbnailUrl;

    @Column(nullable = false)
    private String title; // 스터디 제목

    @Column(nullable = true)
    private String description; // 스터디 설명

    @Column(nullable = false)
    private String host; // 스터디 주최자

    @Column(nullable = false)
    private Integer capacity; // 인원

    @Column(nullable = false)
    @ElementCollection
    private List<String> day = new ArrayList<>(); // 요일

    @Column(nullable = true)
    @ElementCollection
    private List<String> category = new ArrayList<>(); // 카테고리

    @Column(nullable = false)
    private boolean isPublic; // 공개 여부

    @Builder
    public Study(String title, String description, String host, Integer capacity, List<String> day,
                 List<String> category, boolean isPublic) {
        this.title = title;
        this.description = description;
        this.host = host;
        this.capacity = capacity;
        this.day = day;
        this.category = category;
        this.isPublic = isPublic;
    }

}