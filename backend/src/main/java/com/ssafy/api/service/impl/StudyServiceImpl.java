package com.ssafy.api.service.impl;

import com.ssafy.api.request.study.StudyCreatePostReq;
import com.ssafy.api.request.study.StudyInfoUpdatePutReq;
import com.ssafy.api.response.study.StudyDetailRes;
import com.ssafy.api.response.study.StudyRes;
import com.ssafy.api.service.StudyService;
import com.ssafy.common.exception.AccessDeniedException;
import com.ssafy.common.util.FileValidator;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * 스터디 관련 비즈니스 로직 처리를 위한 서비스 구현 정의
 */
@RequiredArgsConstructor
@Service
public class StudyServiceImpl implements StudyService {

    private final Logger LOGGER = LoggerFactory.getLogger(StudyServiceImpl.class);
    private final UserRepository userRepository;
    private final StudyRepository studyRepository;
    private final QStudyRepositorySupport qStudyRepositorySupport;
    private final UserStudyRepository userStudyRepository;
    private final StudyImgRepository studyImgRepository;
    private final CategoryRepository categoryRepository;
    private final String path = "C:\\Users\\images\\study\\";

    /**
     * 스터디 생성
     */
    @Transactional
    @Override
    public StudyRes createStudy(String email, StudyCreatePostReq studyCreatePostReq) {
        // 회원 조회
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다"));

        // 스터디 생성
        Study newStudy = studyCreatePostReq.toEntity(user);

        // 카테고리 생성
        List<Category> categories = new ArrayList<>();
        for (int i = 0; i < studyCreatePostReq.getCategory().size(); i++) {
            categories.add(new Category(newStudy, studyCreatePostReq.getCategory().get(i)));
        }
        newStudy.setCategory(categories);

        // 스터디 저장
        studyRepository.save(newStudy);
        userStudyRepository.save(new UserStudy(user, newStudy));

        // 카테고리 저장
        for (int i = 0; i < categories.size(); i++) {
            categoryRepository.save(categories.get(i));
        }

        StudyRes studyRes = new StudyRes(newStudy);
        studyRes.setUsers(userStudyRepository.findAllByStudyId(newStudy.getId()));
        studyRes.setCategory(categoryRepository.findAllByStudyId(newStudy.getId()));
        LOGGER.info("[createStudy] 스터디(id : {}) 생성 완료", studyRes.getId());

        return studyRes;
    }

    /**
     * 스터디 참여
     */
    @Transactional
    @Override
    public StudyRes joinStudy(String email, Long studyId) {
        User foundUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        Study foundStudy = studyRepository.findById(studyId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 스터디입니다."));

        // 참여자 수가 정원보다 같거나 클 경우 예외를 발생
        if (foundStudy.getHeadcount() >= foundStudy.getCapacity()) {
            throw new IllegalArgumentException("인원이 초과하였습니다.");
        }

        // 이미 참여한 스터디일 경우 예외를 발생
        if (userStudyRepository.existsByUserIdAndStudyId(foundUser.getId(), foundStudy.getId())) {
            throw new IllegalArgumentException("이미 참여한 스터디입니다.");
        }

        foundStudy.increaseHeadcount(); // 참여자 수 증가
        UserStudy userStudy = userStudyRepository.save(new UserStudy(foundUser, foundStudy));
        LOGGER.info("[joinStudy] {} 스터디(id : {}) 참가 완료", email, studyId);

        StudyRes studyRes = new StudyRes(foundStudy);
        studyRes.setUsers(userStudyRepository.findAllByStudyId(studyId));
        return studyRes;
    }

    /**
     * 스터디 참여 여부 확인
     */
    @Override
    public void checkStudyMember(String email, Long studyId) {
        // 스터디 조회
        Study foundStudy = studyRepository.findById(studyId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 스터디입니다."));

        boolean flag = false;
        // 스터디에 가입한 인원이 아니라면 예외를 던진다
        List<UserStudy> userStudies = foundStudy.getUsers();
        for (int i = 0; i < userStudies.size(); i++) {
            if (email.equals(userStudies.get(i).getUser().getEmail())) {
                flag = true;
            }
        }

        if (!flag) {
            throw new AccessDeniedException("잘못된 접근입니다. 처음으로 이동합니다.");
        }
    }

    /**
     * 스터디 나가기
     */
    @Transactional
    @Override
    public void leaveStudy(String email, Long studyId) {
        User foundUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        Study foundStudy = studyRepository.findById(studyId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 스터디입니다."));

        UserStudy userStudy = userStudyRepository.findByUserIdAndStudyId(foundUser.getId(), foundStudy.getId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 리소스입니다."));

        // 스터디를 나가는 사용자가 호스트일 경우 스터디를 없앰
        if (email.equals(foundStudy.getCreatedBy())) {
            categoryRepository.deleteByStudyId(studyId);
            userStudyRepository.deleteByStudyId(studyId);
            studyRepository.delete(foundStudy);
        }

        // 참여자 수를 하나 감소시킴
        foundStudy.decreaseHeadcount();

        userStudyRepository.delete(userStudy);
        LOGGER.info("[leaveStudy] {} 스터디(id : {}) 떠나기 완료", email, studyId);
    }

    /**
     * 스터디 목록 조회
     */
    @Override
    public List<StudyRes> findByCondition(List<String> skill, Integer generation, String region, Integer classNum, Boolean isPublic) {
        if (skill == null) {
            skill = new ArrayList<>();
            skill.add("java");
            skill.add("javascript");
            skill.add("python");
            skill.add("c");
            skill.add("c++");
            skill.add("spring");
            skill.add("vue");
            skill.add("react");
        }

        List<StudyRes> response = qStudyRepositorySupport.findByCondition(skill, generation, region, classNum, isPublic).stream()
                .map(StudyRes::new).collect(Collectors.toList());

        for (int i = 0; i < response.size(); i++) {
            List<Category> categories = studyRepository.findById(response.get(i).getId()).get().getCategory();
            response.get(i).setCategory(categories);
        }

        return response;
    }

    /**
     * 스터디 조회
     */
    @Transactional
    @Override
    public StudyDetailRes findByStudyId(Long studyId) {
        Study foundStudy = studyRepository.findById(studyId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 스터디입니다"));

        StudyDetailRes studyDetailRes = new StudyDetailRes(foundStudy);
        List<UserStudy> userStudies = userStudyRepository.findAllByStudyId(studyId);

        List<String> emails = new ArrayList<>();
        for(int i = 0; i < userStudies.size(); i++){
            emails.add(userStudies.get(i).getUser().getEmail());
        }

        studyDetailRes.setUserList(emails);
        studyDetailRes.setUsers(userStudies);
        studyDetailRes.setCategory(categoryRepository.findAllByStudyId(studyId));
        return studyDetailRes;
    }

    /**
     * 스터디 수정
     */
    @Transactional
    @Override
    public StudyRes updateStudyInfo(String email, Long studyId, StudyInfoUpdatePutReq studyInfoUpdatePutReq) {
        Study foundStudy = studyRepository.findById(studyId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 스터디입니다"));

        // 스터디 생성자와 이메일이 일치하는지 확인
        if (!foundStudy.getCreatedBy().equals(email)) {
            throw new AccessDeniedException("권한이 없습니다");
        }

        // 스터디 수정
        categoryRepository.deleteByStudyId(studyId);
        List<Category> list = new ArrayList<>();
        for (int i = 0; i < studyInfoUpdatePutReq.getCategory().size(); i++) {
            Category category = new Category(foundStudy, studyInfoUpdatePutReq.getCategory().get(i));
            list.add(category);
            categoryRepository.save(category);
        }
        foundStudy.changeInfo(studyInfoUpdatePutReq);
        foundStudy.setCategory(list);
        Study changedStudy = studyRepository.save(foundStudy);

        StudyRes studyRes = new StudyRes(changedStudy);
        studyRes.setUsers(userStudyRepository.findAllByStudyId(changedStudy.getId()));
        studyRes.setCategory(categoryRepository.findAllByStudyId(changedStudy.getId()));
        LOGGER.info("[updateStudyInfo] 스터디(id : {}) 수정 완료", changedStudy.getId());

        return studyRes;
    }

    /**
     * 스터디 삭제
     */
    @Override
    public void deleteStudy(String email, Long studyId) {
        Study foundStudy = studyRepository.findById(studyId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 스터디입니다"));

        // 스터디 생성자와 이메일이 일치하는지 확인
        if (!foundStudy.getCreatedBy().equals(email)) {
            throw new AccessDeniedException("권한이 없습니다");
        }

        studyRepository.delete(foundStudy);
        LOGGER.info("[deleteStudy] 스터디(id : {}) 삭제 완료", studyId);
    }

    @Override
    public boolean validImgFile(MultipartFile multipartFile) {
        try (InputStream inputStream = multipartFile.getInputStream()) {
            if (!multipartFile.isEmpty()) {
                boolean isValid = FileValidator.validImgFile(inputStream);
                if (!isValid) {
                    return false;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return true;
    }

    @Override
    public Study getStudy(Long studyId) {
        return studyRepository.findById(studyId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 스터디입니다."));
    }

    @Override
    public Study updateStudy(Study study) {
        return studyRepository.save(study);
    }

    @Override
    public StudyImg getImage(Long studyId) {
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        StudyImg studyImg = studyImgRepository.findById(study.getStudyImg().getId()).orElseThrow(() -> new IllegalArgumentException("프로필이 존재하지 않습니다."));
        return studyImg;
    }

    /* 스터디 썸네일 이미지 업로드 */
    @Override
    public StudyImg uploadImage(MultipartFile multipartFile) throws IOException {
        if (validImgFile(multipartFile)) {
            UUID uuid = UUID.randomUUID();
            String fileUrl = path + uuid.toString() + "_" + multipartFile.getOriginalFilename();
            StudyImg studyImg = studyImgRepository.save(
                    StudyImg.builder()
                            .name(multipartFile.getOriginalFilename())
                            .type(multipartFile.getContentType())
                            .fileUrl(fileUrl)
                            .build()
            );
            multipartFile.transferTo(new File(fileUrl));
            return studyImg;
        }
        return null;
    }

    /* 스터디 썸네일 이미지 수정 */
    @Override
    public StudyImg updateImage(MultipartFile multipartFile, Study study) throws IOException {
        UUID uuid = UUID.randomUUID();
        String filePath = path + uuid.toString() + "_" + multipartFile.getOriginalFilename();
        StudyImg studyImg = studyImgRepository.findById(study.getStudyImg().getId()).get();

        File file = new File(studyImg.getFileUrl());
        file.delete();

        studyImg.updateStudyImg(multipartFile, filePath);
        studyImgRepository.save(studyImg);
        multipartFile.transferTo(new File(filePath));

        return studyImg;
    }

    /* 스터디 썸네일 이미지 삭제 */
    @Override
    public void deleteImage(Long studyId) {
        Study study = studyRepository.findById(studyId).get();
        StudyImg studyImg = studyImgRepository.findById(study.getStudyImg().getId()).get();

        study.setStudyImg(null);
        File file = new File(studyImg.getFileUrl());
        file.delete();
        studyImgRepository.deleteById(studyImg.getId());
    }

}
