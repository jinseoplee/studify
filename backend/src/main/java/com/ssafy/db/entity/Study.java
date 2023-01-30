package com.ssafy.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
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
    private String day;

    @Column(nullable = true)
    private String skill;

    @Column(nullable = false)
    private boolean isPublic;

}
