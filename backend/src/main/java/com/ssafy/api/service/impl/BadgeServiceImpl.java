package com.ssafy.api.service.impl;

import com.ssafy.api.service.BadgeService;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserBadge;
import com.ssafy.db.repository.BadgeRepository;
import com.ssafy.db.repository.UserBadgeRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BadgeServiceImpl implements BadgeService {

    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;

    @Override
    public void createTimeBadge(String email) {
        User user = userRepository.findByEmail(email).get();
        Long time = user.getTotalTime() / 3600;

        if (time >= 200) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("전문").get().getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("전문").get());
                userBadgeRepository.save(userBadge);
            }
        }
        if (time >= 100) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("숙련").get().getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("숙련").get());
                userBadgeRepository.save(userBadge);
            }
        }
        if (time >= 50) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("견습").get().getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("견습").get());
                userBadgeRepository.save(userBadge);
            }
        }
        if (time >= 20) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("초보").get().getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("초보").get());
                userBadgeRepository.save(userBadge);
            }
        }
        if (time >= 10) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("신입").get().getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("신입").get());
                userBadgeRepository.save(userBadge);
            }
        }
    }

}
