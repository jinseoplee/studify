package com.ssafy.api.service.impl;

import com.ssafy.api.service.StudyImgService;
import com.ssafy.db.entity.Study;
import com.ssafy.db.entity.StudyImg;
import com.ssafy.db.repository.StudyImgRepository;
import com.ssafy.db.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class StudyImgServiceImpl implements StudyImgService {

    private final StudyImgRepository studyImgRepository;
    private final StudyRepository studyRepository;
    private final String path = "C:\\Users\\images\\study\\";

    /* 스터디 썸네일 이미지 업로드 */
    public StudyImg uploadImage(MultipartFile multipartFile) throws IOException {
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

    /* 스터디 썸네일 이미지 수정 */
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
    public void deleteImage(Long studyId) {
        Study study = studyRepository.findById(studyId).get();
        StudyImg studyImg = studyImgRepository.findById(study.getStudyImg().getId()).get();

        study.setStudyImg(null);
        File file = new File(studyImg.getFileUrl());
        file.delete();

        studyImgRepository.deleteById(studyImg.getId());
    }

}
