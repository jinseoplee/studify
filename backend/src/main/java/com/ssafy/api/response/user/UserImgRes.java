package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserImg;

public class UserImgRes extends BaseResponseBody {

    private String fileurl;
    private String name;

    public UserImgRes(Integer statusCode, String message, UserImg userImg) {
        super(statusCode, message);
        this.fileurl = userImg.getFileUrl();
        this.name = userImg.getName();
    }

}
