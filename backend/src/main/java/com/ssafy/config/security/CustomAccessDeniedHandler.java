package com.ssafy.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.common.model.response.BaseResponseBody;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 권한이 없는 예외가 발생했을 경우 핸들링하는 클래스
 */
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final Logger LOGGER = LoggerFactory.getLogger(CustomAccessDeniedHandler.class);

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ObjectMapper objectMapper = new ObjectMapper();
        LOGGER.info("[handle] 접근 권한이 없습니다.");

        BaseResponseBody baseResponseBody = new BaseResponseBody(403, "접근 권한이 없습니다.");

        response.setStatus(403);
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.getWriter().write(objectMapper.writeValueAsString(baseResponseBody));
    }

}
