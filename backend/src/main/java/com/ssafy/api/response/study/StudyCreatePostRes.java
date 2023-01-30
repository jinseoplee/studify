package com.ssafy.api.response.study;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Study;
import lombok.Getter;

@Getter
public class StudyCreatePostRes extends BaseResponseBody {

    private long studyId;

    public StudyCreatePostRes(Integer statusCode, String message, Study study) {
        super(statusCode, message);
        this.studyId = study.getId();
    }

}