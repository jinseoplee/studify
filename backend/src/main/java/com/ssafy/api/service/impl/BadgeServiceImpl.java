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
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("전문").getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("전문"));
                userBadgeRepository.save(userBadge);
            }
        }
        if (time >= 100) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("숙련").getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("숙련"));
                userBadgeRepository.save(userBadge);
            }
        }
        if (time >= 50) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("견습").getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("견습"));
                userBadgeRepository.save(userBadge);
            }
        }
        if (time >= 20) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("초보").getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("초보"));
                userBadgeRepository.save(userBadge);
            }
        }
        if (time >= 10) {
            if (!userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName("신입").getId())) {
                UserBadge userBadge = new UserBadge(user, badgeRepository.findByName("신입"));
                userBadgeRepository.save(userBadge);
            }
        }
    }

    @Override
    public void createDayBadge(String email) {
        User user = userRepository.findByEmail(email).get();
        List<UserTimeLog> userTimeLog = userTimeLogRepository.findAllByUser(user);

        int size = userTimeLog.size();
        String badgeName = "";

        if (size >= 128) {
            badgeName = "출석 7단계";
        } else if (size >= 64) {
            badgeName = "출석 6단계";
        } else if (size >= 32) {
            badgeName = "출석 5단계";
        } else if (size >= 16) {
            badgeName = "출석 4단계";
        } else if (size >= 8) {
            badgeName = "출석 3단계";
        } else if (size >= 4) {
            badgeName = "출석 2단계";
        } else if (size >= 2) {
            badgeName = "출석 1단계";
        }

        if (size>=2 && !userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badgeRepository.findByName(badgeName).getId())) {
            UserBadge userBadge = new UserBadge(user, badgeRepository.findByName(badgeName));
            userBadgeRepository.save(userBadge);
        }
    }

    @Override
    @Scheduled(cron = "0 0 0 1 * *", zone = "Asia/Seoul")
    public void createRankBadge() {
        List<User> userList8 = userRepository.findAllByGeneration(8, Sort.by(Sort.Direction.DESC, "totalTime"));
        List<User> userList9 = userRepository.findAllByGeneration(9, Sort.by(Sort.Direction.DESC, "totalTime"));

        Integer size8 = userList8.size();
        Integer size9 = userList9.size();

        if (size8 > 0 && userList8.get(0).getTotalTime() != 0 && !userBadgeRepository.existsByUserIdAndBadgeId(userList8.get(0).getId(), badgeRepository.findByName("1st").getId())) {
            UserBadge userBadge = new UserBadge(userList8.get(0), badgeRepository.findByName("1st"));
            userBadgeRepository.save(userBadge);
        }
        if (size8 > 1 && userList8.get(1).getTotalTime() != 0 && !userBadgeRepository.existsByUserIdAndBadgeId(userList8.get(1).getId(), badgeRepository.findByName("2nd").getId())) {
            UserBadge userBadge = new UserBadge(userList8.get(1), badgeRepository.findByName("2nd"));
            userBadgeRepository.save(userBadge);
        }
        if (size8 > 2 && userList8.get(2).getTotalTime() != 0 && !userBadgeRepository.existsByUserIdAndBadgeId(userList8.get(2).getId(), badgeRepository.findByName("3rd").getId())) {
            UserBadge userBadge = new UserBadge(userList8.get(2), badgeRepository.findByName("3rd"));
            userBadgeRepository.save(userBadge);
        }


        if (size9 > 0 && userList9.get(0).getTotalTime() != 0 && !userBadgeRepository.existsByUserIdAndBadgeId(userList9.get(0).getId(), badgeRepository.findByName("1st").getId())) {
            UserBadge userBadge = new UserBadge(userList9.get(0), badgeRepository.findByName("1st"));
            userBadgeRepository.save(userBadge);
        }
        if (size9 > 1 && userList9.get(1).getTotalTime() != 0 && !userBadgeRepository.existsByUserIdAndBadgeId(userList9.get(1).getId(), badgeRepository.findByName("2nd").getId())) {
            UserBadge userBadge = new UserBadge(userList9.get(1), badgeRepository.findByName("2nd"));
            userBadgeRepository.save(userBadge);
        }
        if (size9 > 2 && userList9.get(2).getTotalTime() != 0 && !userBadgeRepository.existsByUserIdAndBadgeId(userList9.get(2).getId(), badgeRepository.findByName("3rd").getId())) {
            UserBadge userBadge = new UserBadge(userList9.get(2), badgeRepository.findByName("3rd"));
            userBadgeRepository.save(userBadge);
        }

    }

}