package com.ssafy.api.response.user;

import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserStudy;
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

}
