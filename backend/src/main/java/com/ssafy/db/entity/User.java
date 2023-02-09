package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * 유저 모델 정의
 */
@NoArgsConstructor
@Getter
@Setter
@Table(name = "user")
@Entity
public class User extends BaseTimeEntity implements UserDetails {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email; // 이메일

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password; // 비밀번호

    @Column(nullable = false)
    private String region; // 지역

    @Column(nullable = false)
    private Integer generation; // 기수

    @Column(nullable = false)
    private Integer classNum; // 반

    @Column(nullable = false)
    private String name; // 이름

    @Column(nullable = false)
    @ColumnDefault("0")
    private Long totalTime;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "user")
    private List<UserStudy> studies = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "user_img_id", referencedColumnName = "user_img_id")
    private UserImg userImg; // 유저 이미지

    @Builder
    public User(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    /**
     * 계정이 가지고 있는 권한 목록을 리턴
     *
     * @return null
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    /**
     * 유저를 구분할 수 있는 이메일을 리턴
     *
     * @return email
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return this.email;
    }

    /**
     * 계정이 만료되었는지 체크
     *
     * @return true
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * 계정이 잠겼는지 체크
     *
     * @return true
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * 계정의 비밀번호가 만료되었는지 체크
     *
     * @return true
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 계정이 사용가능한지 체크
     *
     * @return true
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isEnabled() {
        return true;
    }

}