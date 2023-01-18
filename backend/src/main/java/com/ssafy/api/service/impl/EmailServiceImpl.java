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
import java.util.StringTokenizer;

@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender javaMailSender;
    public final PasswordEncoder passwordEncoder;

    public void sendMail(String to, String subject, String content) throws MessagingException {
        /* 이메일 전송 */
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setFrom("hmschlng@naver.com"); // 발신자 (우리)를 지정
        helper.setTo(to); // 받는 사람(사용자)을 지정
        helper.setSubject(subject); // 제목 지정
        helper.setText(content, true);

        javaMailSender.send(mimeMessage);
    }

    public String getCertificationCode() {
        Random rand = new Random();
        StringBuilder sb = new StringBuilder();

        // 10자리 랜덤 ascii string
        for (int i = 0; i < 10; i++) {
            sb.append((char) (rand.nextInt(128 - 33) + 33));
        }

        // bycrypt로 인코딩해서 반환
        return passwordEncoder.encode(sb.toString());
    }

    public String buildMailContent(String htmlContent, String code, Long time) {
        String[] split = htmlContent.split("XXXX|YYYY");
        return new StringBuffer()
                .append(split[0])
                .append(code)
                .append(split[1])
                .append(time)
                .append(split[2])
                .toString();
    }
}
