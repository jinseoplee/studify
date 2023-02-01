package com.ssafy.config.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

/**
 * JWT 토큰을 생성하고 유효성을 검증하는 컴포넌트 클래스
 */
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    private final Logger LOGGER = LoggerFactory.getLogger(JwtTokenProvider.class);
    private final UserDetailsService userDetailsService;
    private final long tokenValidMillisecond = 1000L * 60 * 60;

    @Value("${jwt.secret}")
    private String secretKey = "secretKey";

    /**
     * secretKey 인코딩 수행
     */
    @PostConstruct
    protected void init() {
        LOGGER.info("[init] secretKey 초기화 시작");
        LOGGER.info("{} before encoding", secretKey);
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
        LOGGER.info("[init] secretKey 초기화 완료");
        LOGGER.info("{} after encoding", secretKey);
    }

    /**
     * JWT 토큰 생성
     *
     * @param email
     * @return token
     */
    public String createToken(String email) {
        LOGGER.info("[createToken] 토큰 생성 시작");
        Claims claims = Jwts.claims().setSubject(email);

        Date now = new Date();
        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidMillisecond))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        LOGGER.info("[createToken] 토큰 생성 완료");
        return token;
    }

    /**
     * JWT 토큰을 받아 인증 정보 조회
     *
     * @param token
     * @return Authentication
     */
    public Authentication getAuthentication(String token) {
        LOGGER.info("[getAuthentication] 토큰 인증 정보 조회 시작");
        UserDetails userDetails = userDetailsService.loadUserByUsername(getUsername(token));
        LOGGER.info("[getAuthentication] 토큰 인증 정보 조회 완료. email : {}", userDetails.getUsername());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    /**
     * JWT 토큰에서 회원 구별 정보 추출
     *
     * @param token
     * @return email;
     */
    private String getUsername(String token) {
        LOGGER.info("[getUsername] 토큰 기반 회원 구별 정보 추출 시작");
        String email = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
        LOGGER.info("[getUsername] 토큰 기반 회원 구별 정보 추출 완료. email : {}", email);
        return email;
    }

    /**
     * HTTP Request Header에 설정된 토큰 값을 가져옴
     *
     * @param request
     * @return token
     */
    public String resolveToken(HttpServletRequest request) {
        LOGGER.info("[resolveToken] HTTP 헤더에서 Token 값 추출");
        return request.getHeader("X-AUTH-TOKEN");
    }

    /**
     * JWT 토큰 유효성, 만료일 체크
     *
     * @param token
     * @return boolean
     */
    public boolean validateToken(String token) {
        LOGGER.info("[validateToken] 토큰 유효성 체크 시작");
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            LOGGER.info("[validateToken] 토큰 유효성 체크 완료");
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            LOGGER.info("[validateToken] 토큰 유효성 체크 예외 발생");
            return false;
        }
    }

}
