package com.ssafy.api.request.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginPostReq {

    private String email;
    private String password;
    
}
