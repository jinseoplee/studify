package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

/**
 * 모델 간 공통 사항 정의
 */
@Getter
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public abstract class BaseEntity extends BaseTimeEntity {

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @CreatedBy
    @Column(updatable = false)
    private String createdBy; // 생성자

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @LastModifiedBy
    private String modifiedBy; // 수정자

}
