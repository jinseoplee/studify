package com.ssafy.api.service;

/**
 * 뱃지 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의
 */
public interface BadgeService {

    // 누적 시간에 따른 뱃지 생성
    void createTimeBadge(String email);

    // 출석 일수에 따른 뱃지 생성
    void createDayBadge(String email);

    // 랭킹 순위에 따른 뱃지 생성
    void createRankBadge();

}
