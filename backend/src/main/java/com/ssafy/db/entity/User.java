package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
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
    private String regionId;

    @Column(nullable = false)
    private String classId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer gisu;

    @Column(name = "nickname")
    private String nickname;

    @OneToOne(mappedBy = "user")
    private ProfileImg profileImg;

    @Builder
    public User(String email, String password, String name, String nickname) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
    }

    public void updateUserInfo(String nickname) {
        this.nickname = nickname;
        // 나중에 추가되는 정보도 여기서 변경
    }

    public void updatePassword(String password) {
        this.password = password;
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
