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

}
