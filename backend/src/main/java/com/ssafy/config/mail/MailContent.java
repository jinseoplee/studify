package com.ssafy.config.mail;

import org.springframework.stereotype.Component;

import java.lang.reflect.Parameter;

@Component
public class MailContent {
//    public static String AUTH_MAIL_SUBJECT = ;
    public static String AUTH_MAIL_DELIMITERS = "USERNAME|DOMAINPORT|CERTIFICATIONCODE|TIME";
    public static String AUTH_MAIL_BODY =
            "<!DOCTYPE html>\n" +
            "<html>\n" +
            "<head>\n" +
            "</head>\n" +
            "<body>\n" +
            "  <div style= \"width: 400px; height: 600px; border-top: 4px solid #8a6bcd; margin: 100px auto; padding: 30px 0; box-sizing: border-box;\">\n" +
            "    <h1 style= \"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;\">\n" +
            "      <h2 style=\"font-size: 15px; margin: 0 0 10px 3px;\">Studify</h2>\n" +
            "      <br />\n" +
            "      <span style=\"color: #8a6bcd\">메일인증</span> 안내입니다.\n" +
            "    </h1>\n" +
            "    <p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\">\n" +
            "      USERNAME 님 안녕하세요.<br />\n" +
            "      Studify에 가입해 주셔서 진심으로 감사드립니다.<br />\n" +
            "      아래 <b style=\"color: #8a6bcd\">\"메일 인증\"</b> 버튼을 클릭하여 회원가입을 완료해 주세요.<br />\n" +
            "      감사합니다.\n" +
            "    </p>\n" +
            "    <form method=\"POST\" actions=\"http://DOMAINPORT/api/v1/users/auth/mail\">\n" +
            "      <input type=\"hidden\" name=\"code\" value=\"CERTIFICATIONCODE\"/>\n" +
            "      <input type=\"hidden\" name=\"time\" value=\"TIME\"/>\n" +
            "      <p style=\"display: inline-block; color:white; text-align: center; width: 210px; height: 45px; margin: 30px 5px 40px; background: #8a6bcd; line-height: 45px; vertical-align: middle; font-size: 16px;\">\n" +
            "      메일 인증\n" +
            "      </p>\n" +
            "      </input>\n" +
            "    </form>\n" +
            "    <div style=\"border-top: 1px solid #DDD; padding: 5px;\">\n" +
            "    </div>\n" +
            "  </div>\n" +
            "</body>\n" +
            "</html>";
}
