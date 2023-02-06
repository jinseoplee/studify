package com.ssafy.common.util;

import org.springframework.stereotype.Component;

@Component
public class EmailContent {
    public static String AUTH_MAIL_DELIMITERS = "USERNAME|DOMAIN|CODE";
    public static String AUTH_MAIL_BODY = "<!DOCTYPE html> \n" +
            "<html lang=\"en\"> \n" +
            "<head> \n" +
            "  <meta charset=\"UTF-8\"> \n" +
            "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
            "  <style> \n" +
            "    .certificate:hover { \n" +
            "      background-color: #cabbe7; \n" +
            "    } \n" +
            "  </style>\n" +
            "</head> \n" +
            "<body> \n" +
            "  <div style= \"width: 400px; height: 600px; border-top: 4px solid #8a6bcd; margin: 100px auto; padding: 30px 0; box-sizing: border-box;\"> \n" +
            "    <h1 style= \"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;\"> \n" +
            "      <h2 style=\"font-size: 15px; margin: 0 0 10px 3px;\">Studify</h2> \n" +
            "      <br /> \n" +
            "      <span style=\"color: #8a6bcd\">메일인증</span> 안내입니다. \n" +
            "    </h1> \n" +
            "    <p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\"> \n" +
            "      USERNAME 님 안녕하세요.<br /> \n" +
            "      Studify에 가입해 주셔서 진심으로 감사드립니다.<br /> \n" +
            "      아래 <b style=\"color: #8a6bcd\">\"메일 인증\"</b> 버튼을 클릭하여 회원가입을 완료해 주세요.<br /> \n" +
            "      감사합니다. \n" +
            "    </p>\n" +
            "    <div>\n" +
            "      <a href=\"http://DOMAIN/user/signup/CODE\" \n" +
            "        class=\"certificate\"\n" +
            "        style=\"display: inline-block;\n" +
            "        color:white; \n" +
            "        text-align: center;  \n" +
            "        width: 210px;  \n" +
            "        height: 45px;  \n" +
            "        margin: 30px 5px 40px;  \n" +
            "        background: #8a6bcd;  \n" +
            "        line-height: 45px;  \n" +
            "        vertical-align: middle;  \n" +
            "        font-size: 16px; \n" +
            "        text-decoration: none;\">\n" +
            "          메일 인증\n" +
            "      </a>\n" +
            "    </div>\n" +
            "  </div> \n" +
            "</body>\n" +
            "</html>";

}
