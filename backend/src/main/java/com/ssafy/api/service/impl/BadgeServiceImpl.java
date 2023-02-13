package com.ssafy.api.service.impl;

import com.ssafy.api.service.BadgeService;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserBadge;
import com.ssafy.db.entity.UserTimeLog;
import com.ssafy.db.repository.BadgeRepository;
import com.ssafy.db.repository.UserBadgeRepository;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserTimeLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BadgeServiceImpl implements BadgeService {

    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final UserTimeLogRepository userTimeLogRepository;

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

    @Override
    public void createDayBadge(String email) {
        User user = userRepository.findByEmail(email).get();
        List<UserTimeLog> userTimeLog = userTimeLogRepository.findByUser(user);
        if (userTimeLog.size() >= 128) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("출석 7단계").get().getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("출석 7단계").get());
                userBadgeRepository.save(userBadge);
            }
        }
        if (userTimeLog.size() >= 64) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("출석 6단계").get().getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("출석 6단계").get());
                userBadgeRepository.save(userBadge);
            }
        }
        if (userTimeLog.size() >= 32) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("출석 5단계").get().getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("출석 5단계").get());
                userBadgeRepository.save(userBadge);
            }
        }
        if (userTimeLog.size() >= 16) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("출석 4단계").get().getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("출석 4단계").get());
                userBadgeRepository.save(userBadge);
            }
        }
        if (userTimeLog.size() >= 8) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("출석 3단계").get().getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("출석 3단계").get());
                userBadgeRepository.save(userBadge);
            }
        }
        if (userTimeLog.size() >= 4) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("출석 2단계").get().getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("출석 2단계").get());
                userBadgeRepository.save(userBadge);
            }
        }
        if (userTimeLog.size() >= 2) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("출석 1단계").get().getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("출석 1단계").get());
                userBadgeRepository.save(userBadge);
            }
        }
    }

    @Override
    @Scheduled(cron = "0 0 0 1 * *", zone = "Asia/Seoul")
    public void createRankBadge() {
        List<User> userList8 = userRepository.findAllByGeneration(8, Sort.by(Sort.Direction.DESC, "totalTime"));

        if (userList8.size() > 0 && userList8.get(0).getTotalTime() != 0 && !userBadgeRepository.existsByUserIdAndBadgeId(userList8.get(0).getId(), badgeRepository.findByName("1st").get().getId())) {
            UserBadge userBadge = new UserBadge(userList8.get(0), badgeRepository.findByName("1st").get());
            userBadgeRepository.save(userBadge);
        }
        if (userList8.size() > 1 && userList8.get(1).getTotalTime() != 0 && !userBadgeRepository.existsByUserIdAndBadgeId(userList8.get(1).getId(), badgeRepository.findByName("2nd").get().getId())) {
            UserBadge userBadge = new UserBadge(userList8.get(1), badgeRepository.findByName("2nd").get());
            userBadgeRepository.save(userBadge);
        }
        if (userList8.size() > 2 && userList8.get(2).getTotalTime() != 0 && !userBadgeRepository.existsByUserIdAndBadgeId(userList8.get(2).getId(), badgeRepository.findByName("3rd").get().getId())) {
            UserBadge userBadge = new UserBadge(userList8.get(2), badgeRepository.findByName("3rd").get());
            userBadgeRepository.save(userBadge);
        }

        List<User> userList9 = userRepository.findAllByGeneration(9, Sort.by(Sort.Direction.DESC, "totalTime"));

        if (userList9.size() > 0 && userList9.get(0).getTotalTime() != 0 && !userBadgeRepository.existsByUserIdAndBadgeId(userList9.get(0).getId(), badgeRepository.findByName("1st").get().getId())) {
            UserBadge userBadge = new UserBadge(userList9.get(0), badgeRepository.findByName("1st").get());
            userBadgeRepository.save(userBadge);
        }
        if (userList9.size() > 1 && userList9.get(1).getTotalTime() != 0 && !userBadgeRepository.existsByUserIdAndBadgeId(userList9.get(1).getId(), badgeRepository.findByName("2nd").get().getId())) {
            UserBadge userBadge = new UserBadge(userList9.get(1), badgeRepository.findByName("2nd").get());
            userBadgeRepository.save(userBadge);
        }
        if (userList9.size() > 2 && userList9.get(2).getTotalTime() != 0 && !userBadgeRepository.existsByUserIdAndBadgeId(userList9.get(2).getId(), badgeRepository.findByName("3rd").get().getId())) {
            UserBadge userBadge = new UserBadge(userList9.get(2), badgeRepository.findByName("3rd").get());
            userBadgeRepository.save(userBadge);
        }

    }

}
