package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Collection;

/**
 * 유저 모델 정의
 */
@NoArgsConstructor
@Getter
@Entity
public class User extends BaseEntity implements UserDetails {

    @Id
    @Column(nullable = false, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "img_origin")
    private String imgOrigin;

    @Column(name = "img_save")
    private String imgSave;

    @Builder
    public User(String email, String password, String name, String imgOrigin, String imgSave) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.imgOrigin = imgOrigin;
        this.imgSave = imgSave;
    }

    public void updateUserInfo(String nickname) {
        this.nickname = nickname;
        // 나중에 추가되는 정보도 여기서 변경
    }

    /**
     * 계정이 가지고 있는 권한 목록을 리턴
     *
     * @return null
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    /**
     * 유저를 구분할 수 있는 이메일을 리턴
     *
     * @return email
     */
    @Override
    public String getUsername() {
        return this.email;
    }

    /**
     * 계정이 만료되었는지 체크
     *
     * @return true
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * 계정이 잠겼는지 체크
     *
     * @return true
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * 계정의 비밀번호가 만료되었는지 체크
     *
     * @return true
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 계정이 사용가능한지 체크
     *
     * @return true
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

}
