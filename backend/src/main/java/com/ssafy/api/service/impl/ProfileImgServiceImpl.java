package com.ssafy.api.service.impl;

import com.ssafy.api.service.ProfileImgService;
import com.ssafy.api.util.FileValidator;
import com.ssafy.db.entity.ProfileImg;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ProfileImgRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ProfileImgServiceImpl implements ProfileImgService {

    private final ProfileImgRepository profileImgRepository;
    private final UserRepository userRepository;
    private final String path = "C:\\Users\\images\\";

    /* 프로필 이미지 업로드 */
    public String uploadImage(MultipartFile multipartFile, String email) throws IOException {
        try (InputStream inputStream = multipartFile.getInputStream()) {
            if (!multipartFile.isEmpty()) {
                boolean isValid = FileValidator.validImgFile(inputStream);
                if (!isValid) {
                    return "이미지 파일만 업로드 가능합니다.";
                }
                User user = userRepository.findById(email).get();
                UUID uuid = UUID.randomUUID();
                String filePath = path + uuid.toString() + "_" + multipartFile.getOriginalFilename();
                ProfileImg profileImg = profileImgRepository.save(
                        ProfileImg.builder()
                                .name(multipartFile.getOriginalFilename())
                                .type(multipartFile.getContentType())
                                .filePath(filePath)
                                .user(user)
                                .build()
                );

                multipartFile.transferTo(new File(filePath));

                if (profileImg != null) {
                    return "프로필이 성공적으로 등록되었습니다! 파일 경로: " + filePath;
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    /* 프로필 이미지 수정 */
    public String updateImage(MultipartFile multipartFile, String email) throws IOException {
        try (InputStream inputStream = multipartFile.getInputStream()) {
            if (!multipartFile.isEmpty()) {
                boolean isValid = FileValidator.validImgFile(inputStream);
                if (!isValid) {
                    return "이미지 파일만 업로드 가능합니다.";
                }
                User user = userRepository.findById(email).get();
                UUID uuid = UUID.randomUUID();
                String filePath = path + uuid.toString() + "_" + multipartFile.getOriginalFilename();
                ProfileImg profileImg = profileImgRepository.findByUser(user).get();
                File file = new File(profileImg.getFilePath());
                file.delete();
                profileImg.updateProfileImg(multipartFile, filePath);
                profileImgRepository.save(profileImg);
                multipartFile.transferTo(new File(filePath));

                if (profileImg != null) {
                    return "프로필이 성공적으로 등록되었습니다! 파일 경로: " + filePath;
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    /* 프로필 이미지 삭제 */
    public void deleteImage(String email) {
        User user = userRepository.findById(email).get();
        ProfileImg profileImg = profileImgRepository.findByUser(user).get();
        File file = new File(profileImg.getFilePath());
        file.delete();
        profileImgRepository.deleteById(profileImg.getId());
    }

}
