package com.ssafy.api.service.impl;

import com.ssafy.api.request.study.StudyCreatePostReq;
import com.ssafy.api.request.study.StudyInfoUpdatePutReq;
import com.ssafy.api.response.study.StudyRes;
import com.ssafy.api.service.StudyService;
import com.ssafy.common.exception.AccessDeniedException;
import com.ssafy.common.util.FileValidator;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.StudyImg;
import com.ssafy.db.repository.StudyImgRepository;
import com.ssafy.db.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
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
    private final StudyRepository studyRepository;
    private final StudyImgRepository studyImgRepository;
    private final String path = "C:\\Users\\images\\study\\";

    /**
     * 스터디 생성
     */
    @Override
    public StudyRes createStudy(StudyCreatePostReq studyCreatePostReq) {
        Study createdStudy = studyRepository.save(studyCreatePostReq.toEntity());
        LOGGER.info("[createStudy] 스터디(id : {}) 생성 완료", createdStudy.getId());

        return new StudyRes(createdStudy);
    }

    /**
     * 스터디 목록 조회
     */
    @Override
    public List<StudyRes> findAll() {
        return studyRepository.findAll().stream().map(StudyRes::new).collect(Collectors.toList());
    }

    /**
     * 스터디 수정
     */
    @Override
    public StudyRes updateStudyInfo(String email, Long studyId, StudyInfoUpdatePutReq studyInfoUpdatePutReq) {
        Study foundStudy = studyRepository.findById(studyId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 스터디입니다"));

        // 스터디 생성자와 이메일이 일치하는지 확인
        if (!foundStudy.getCreatedBy().equals(email)) {
            throw new AccessDeniedException("권한이 없습니다");
        }

        foundStudy.changeInfo(studyInfoUpdatePutReq);
        Study changedStudy = studyRepository.save(foundStudy);
        LOGGER.info("[updateStudyInfo] 스터디(id : {}) 수정 완료", changedStudy.getId());

        return new StudyRes(changedStudy);
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
