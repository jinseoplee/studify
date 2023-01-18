package com.ssafy.api.service.impl;

import com.ssafy.api.request.UserAuthMailPostReq;
import com.ssafy.api.service.EmailService;
import com.ssafy.db.entity.Register;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender javaMailSender;

    public final PasswordEncoder passwordEncoder;

//    /**
//     * 사용자의 이메일 계정으로 이메일을 전송합니다.
//     * @param authMailPostReq
//     * @param to: 받는 사람(사용자)
//     * @param subject: 메일 제목
//     * @param content: 메일 본문
//     * @return Register
//     * @throws MessagingException
//     */
//    public Register sendMail(String to, String subject, String content) throws MessagingException {
//
//        /* 현재 시간 생성 */
//        LocalDateTime mailSentAt = LocalDateTime.now();
//
//        /* 이메일 전송 */
//        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
//
//        helper.setFrom("Studify"); // 발신자 (우리)를 지정
//        helper.setTo(authMailPostReq.getEmail()); // 받는 사람(사용자)을 지정
//        helper.setSubject(authMailPostReq.getSubject()); // 제목 지정
//        helper.setText(content, true);
//
//        javaMailSender.send(mimeMessage);
//
//        return data;
//    }


    /**
     * 10자리 랜덤문자열을 bycrypt 알고리즘으로 인코딩한 해쉬코드입니다.
     * @return
     */
    private String getCertificationCode() {
        Random rand = new Random();
        StringBuilder sb = new StringBuilder();

        // 10자리 랜덤 ascii string
        for (int i = 0; i < 10; i++) {
            sb.append((char) (rand.nextInt(128 - 33) + 33));
        }

        // bycrypt로 인코딩해서 반환
        return passwordEncoder.encode(sb.toString());
    }
//
//    private String buildMailContent(String content) {
//
//    }
}
