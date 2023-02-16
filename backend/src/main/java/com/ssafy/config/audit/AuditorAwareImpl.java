package com.ssafy.config.audit;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<String> {

    /**
     * 현재 로그인 한 사용자의 정보를 조회하여 사용자의 이메일을 등록자와 수정자로 지정
     *
     * @return email
     */
    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = "";
        if (authentication != null) {
            email = authentication.getName();
        }
        return Optional.of(email);
    }

}
