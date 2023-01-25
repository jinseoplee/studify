package com.ssafy.api.service.impl;

import com.ssafy.api.service.ProfileService;
import com.ssafy.db.entity.Profile;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ProfileRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    private final String path = "C:\\Users\\images\\";

    /* 프로필 이미지 업로드 */
    public String uploadImage(MultipartFile multipartFile, String email) throws IOException {
        User user = userRepository.findById(email).get();
        String filePath = path + multipartFile.getOriginalFilename();
        Profile profile = profileRepository.save(
                Profile.builder()
                        .name(multipartFile.getOriginalFilename())
                        .type(multipartFile.getContentType())
                        .filePath(filePath)
                        .user(user)
                        .build()
        );

        multipartFile.transferTo(new File(filePath));

        if (profile != null) {
            return "프로필이 성공적으로 등록되었습니다! 파일 경로: " + filePath;
        }
        return null;
    }

    /* 프로필 이미지 수정 */
    public String updateImage(MultipartFile multipartFile, String email) throws IOException {
        User user = userRepository.findById(email).get();
        String filePath = path + multipartFile.getOriginalFilename();
        Profile profile = profileRepository.findByUser(user).get();
        File file = new File(profile.getFilePath());
        file.delete();
        profile.updateProfile(multipartFile, filePath);
        profileRepository.save(profile);
        multipartFile.transferTo(new File(filePath));

        if (profile != null) {
            return "프로필이 성공적으로 등록되었습니다! 파일 경로: " + filePath;
        }
        return null;
    }

    /* 프로필 이미지 삭제 */
    public void deleteImage(String email) {
        User user = userRepository.findById(email).get();
        Profile profile = profileRepository.findByUser(user).get();
        File file = new File(profile.getFilePath());
        file.delete();
        profileRepository.deleteById(profile.getId());
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
