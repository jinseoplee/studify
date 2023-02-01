package com.ssafy.api.service.impl;

import com.ssafy.api.service.UserImgService;
import com.ssafy.api.util.FileValidator;
import com.ssafy.db.entity.UserImg;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserImgRepository;
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
public class UserImgServiceImpl implements UserImgService {

    private final UserImgRepository userImgRepository;
    private final UserRepository userRepository;
    private final String path = "C:\\Users\\images\\";

    /* 프로필 이미지 업로드 */
    public UserImg uploadImage(MultipartFile multipartFile) throws IOException {
        UUID uuid = UUID.randomUUID();
        String filePath = path + uuid.toString() + "_" + multipartFile.getOriginalFilename();
        UserImg userImg = userImgRepository.save(
                UserImg.builder()
                        .name(multipartFile.getOriginalFilename())
                        .type(multipartFile.getContentType())
                        .filePath(filePath)
                        .build()
        );
        multipartFile.transferTo(new File(filePath));

        return userImg;
    }

    /* 프로필 이미지 수정 */
    public UserImg updateImage(MultipartFile multipartFile, User user) throws IOException {
        UUID uuid = UUID.randomUUID();
        String filePath = path + uuid.toString() + "_" + multipartFile.getOriginalFilename();

        UserImg userImg = userImgRepository.findById(user.getUserImg().getId()).get();

        File file = new File(userImg.getFilePath());
        file.delete();

        userImg.updateProfileImg(multipartFile, filePath);
        userImgRepository.save(userImg);
        multipartFile.transferTo(new File(filePath));

        return userImg;
    }

    /* 프로필 이미지 삭제 */
    public void deleteImage(Long userId) {
        User user = userRepository.findById(userId).get();
        UserImg userImg = userImgRepository.findById(user.getUserImg().getId()).get();

        user.setUserImg(null);
        File file = new File(userImg.getFilePath());
        file.delete();

        userImgRepository.deleteById(userImg.getId());
    }

}
