package com.ssafy.api.service;

import com.ssafy.api.request.UserAuthMailPostReq;
import com.ssafy.db.entity.Register;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;


public interface EmailService {

    void sendMail(String to, String subject, String content) throws MessagingException;
    /**
     * 10자리 랜덤문자열을 bycrypt 알고리즘으로 인코딩한 문자열을 생성합니다.
     * @return
     */
    String getCertificationCode();

    String buildMailContent(String htmlContent, String code, Long time);
}
