package com.ssafy.config.mail;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Random;

@RequiredArgsConstructor
@Component
public class MailDispatcher {

    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender javaMailSender;
    private final MailContent mailContent;

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

    public String buildAuthMailContent(String name, String code, Long time) throws UnknownHostException {

        String[] split = MailContent.AUTH_MAIL_BODY.split(MailContent.AUTH_MAIL_DELIMITERS);
        StringBuffer sb = new StringBuffer();

        // 리팩터링 필요
        return new StringBuffer()
                .append(split[0])
                .append(name)
                .append(split[1])
                .append(InetAddress.getLocalHost() + "8080")
                .append(split[2])
                .append(code)
                .append(split[3])
                .append(time)
                .append(split[4])
                .toString();
    }
}
