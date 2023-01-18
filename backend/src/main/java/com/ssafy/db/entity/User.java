package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Collection;

/**
 * 유저 모델 정의
 */
@NoArgsConstructor
@Getter
@Entity
public class User extends BaseEntity implements UserDetails {

    @Column(nullable = false, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(name = "img_origin")
    private String imgOrigin;

    @Column(name = "img_save")
    private String imgSave;

    @Builder
    public User(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
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


    // 회원정보 업데이트 관련 정책이 정해져야 합니다.
    // 만약 엔드포인트가 전체 회원 정보를 넘겨 주는 경우에는 update persistence가 해결하도록 놔두면 되지만(파일 저장 제외),
    // 엔드포인트가 바꾸려는 정보만을 넘겨 주는 경우에는 어떤 칼럼을 업데이트할 지 정해야 합니다.
//    public void update(String imgOrigin, String imgSave) {
//        this.imgOrigin = imgOrigin;
//        this.imgSave = imgSave;
//    }
}
