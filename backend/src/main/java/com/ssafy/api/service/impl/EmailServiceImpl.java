package com.ssafy.api.service.impl;

import com.ssafy.api.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender javaMailSender;

    /**
     * 사용자의 이메일 계정으로 이메일을 전송합니다.
     * @param to : 보내는 사람
     * @param subject : 메일 제목
     * @param messege : 메일 본문
     * @throws MessagingException
     */
    public void sendMail(String to, String subject, String messege) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setFrom("Studify"); // 보내는사람을 지정
        helper.setTo(to); // 받는 사람을 지정
        helper.setSubject(subject); //
        helper.setText(messege, true);

        javaMailSender.send(mimeMessage);
    }
}
