package com.ssafy.api.response.study;

import com.ssafy.db.entity.Category;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserStudy;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class StudyDetailRes {

    private Long id;

    private String title; // 스터디 제목

    private String description; // 스터디 설명

    private String createdBy; // 스터디 생성자

    private Integer headcount; // 참여자 수

    private Integer capacity; // 정원

    private List<String> day; // 요일

    private List<String> category; // 카테고리

    private List<User> users; // 참여 인원

    private List<String> userList;

    private Boolean isPublic; // 공개 여부

    public StudyDetailRes(Study study) {
        this.id = study.getId();
        this.title = study.getTitle();
        this.description = study.getDescription();
        this.createdBy = study.getCreatedBy();
        this.headcount = study.getHeadcount();
        this.capacity = study.getCapacity();
        this.day = study.getDay();
        this.isPublic = study.getIsPublic();
    }

    public void setUsers(List<UserStudy> userStudies) {
        List<User> users = new ArrayList<>();
        for (int i = 0; i < userStudies.size(); i++) {
            users.add(userStudies.get(i).getUser());
        }
        this.users = users;
    }

    public void setCategory(List<Category> categories) {
        List<String> names = new ArrayList<>();
        for (int i = 0; i < categories.size(); i++) {
            names.add(categories.get(i).getName());
        }
        this.category = names;
    }

    public void setUserList(List<String> emails){
        this.userList = emails;
    }

}
