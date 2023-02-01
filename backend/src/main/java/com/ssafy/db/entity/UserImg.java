package com.ssafy.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class UserImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String fileUrl;

    @Builder
    public UserImg(String name, String type, String fileUrl){
        this.name = name;
        this.type = type;
        this.fileUrl = fileUrl;
    }

    public void updateUserImg(MultipartFile multipartFile, String fileUrl) {
        this.name = multipartFile.getOriginalFilename();
        this.type = multipartFile.getContentType();
        this.fileUrl = fileUrl;
    }

}
