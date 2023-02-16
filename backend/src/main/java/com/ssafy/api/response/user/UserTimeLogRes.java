package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.UserTimeLog;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UserTimeLogRes extends BaseResponseBody {

    private LocalDate day;
    private Long studyTime;

    @Builder
    public UserTimeLogRes(Integer statusCode, String message, UserTimeLog userTimeLog) {
        super(statusCode, message);
        this.day = userTimeLog.getDay();
        this.studyTime = userTimeLog.getStudyTime();
    }

}
