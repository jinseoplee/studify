package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterPutReq {
    private String email;
    private String password;
    private String name;
    private String imgOrigin;
    private String imgSave;
}
