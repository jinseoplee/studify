package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginPostReq {

    private String email;
    private String password;
    
}
