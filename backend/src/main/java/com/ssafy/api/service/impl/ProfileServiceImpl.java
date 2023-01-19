package com.ssafy.api.service.impl;

import com.ssafy.api.service.ProfileService;
import com.ssafy.db.entity.Profile;
import com.ssafy.db.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RequiredArgsConstructor
@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;
    private final String path = "C:\\Users\\images\\";

    /* 프로필 이미지 업로드 */
    public String uploadImage(MultipartFile multipartFile) throws IOException {
        String filePath = path + multipartFile.getOriginalFilename();
        Profile profile = profileRepository.save(
                Profile.builder()
                        .name(multipartFile.getOriginalFilename())
                        .type(multipartFile.getContentType())
                        .filePath(filePath)
                        .build()
        );

        multipartFile.transferTo(new File(filePath));

        if (profile != null) {
            return "profile uploaded successfully! filepath: " + filePath;
        }
        return null;
    }

    /* 프로필 이미지 다운로드
    public byte[] downloadImage(String fileName) throws IOException{
        Profile profile = profileRepository.findByName(fileName)
                .orElseThrow(RuntimeException::new);

        String filePath = profile.getFilePath();

        return Files.readAllBytes(new File(filePath).toPath());
    }
     */

}
