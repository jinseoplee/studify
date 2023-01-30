package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    private String title;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    @ElementCollection
    private List<String> day = new ArrayList<>();

    @Column(nullable = true)
    @ElementCollection
    private List<String> skill = new ArrayList<>();

    @Column(nullable = false)
    private boolean isPublic;

    @Builder
    public Study(String thumbnailUrl, String title, String description, Integer capacity, List<String> day, List<String> skill, boolean isPublic) {
        this.thumbnailUrl = thumbnailUrl;
        this.title = title;
        this.description = description;
        this.capacity = capacity;
        this.day = day;
        this.skill = skill;
        this.isPublic = isPublic;
    }

}