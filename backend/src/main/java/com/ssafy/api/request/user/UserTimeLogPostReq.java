package com.ssafy.api.request.user;

import lombok.Getter;

import java.time.LocalTime;

@Getter
public class UserTimeLogPostReq {

    private LocalTime endTime;
    private LocalTime startTime;

}
