package com.ssafy.api.util;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@RequiredArgsConstructor
@Component
public class MailDispatcher {

    private final JavaMailSender javaMailSender;

    public void sendMail(String to, String subject, String content) throws MessagingException {

        /* 이메일 전송 */
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setFrom("studify-support@naver.com"); // 발신자 (우리)를 지정
        helper.setTo(to); // 받는 사람(사용자)을 지정
        helper.setSubject(subject); // 제목 지정
        helper.setText(content, true);

        javaMailSender.send(mimeMessage);
    }

    public String buildAuthMailContent(String name, String domain, String code) {
        String[] split = EmailContent.AUTH_MAIL_BODY.split(EmailContent.AUTH_MAIL_DELIMITERS);
        StringBuffer sb = new StringBuffer();

        return sb.append(split[0])
                .append(name)
                .append(split[1])
                .append(domain)
                .append(split[2])
                .append(code)
                .append(split[3])
                .toString();
    }

}
