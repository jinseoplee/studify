package com.ssafy.api.response.user;

import com.ssafy.db.entity.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

/**
 * 사용자 조회 API ([GET] /api/v1/users/{userId}), 사용자 수정 API ([PUT] /api/v1/users/{userId}) 요청에 대한 응답값 정의
 */
@Getter
public class UserInfoRes {

    private String email;

    private Integer generation;

    private String region;

    private Integer classNum;

    private String name;

    private List<Study> studies;

    private List<Badge> badges;

    public UserInfoRes(User user) {
        this.email = user.getEmail();
        this.generation = user.getGeneration();
        this.region = user.getRegion();
        this.classNum = user.getClassNum();
        this.name = user.getName();
    }

    public void setStudies(List<UserStudy> userStudies) {
        List<Study> studies = new ArrayList<>();
        for (int i = 0; i < userStudies.size(); i++) {
            studies.add(userStudies.get(i).getStudy());
        }
        this.studies = studies;
    }

    public void setBadges(List<UserBadge> userBadges) {
        List<Badge> badges = new ArrayList<>();
        for (int i = 0; i < userBadges.size(); i++) {
            badges.add(userBadges.get(i).getBadge());
        }
        this.badges = badges;
    }

}
