package com.ssafy.db.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Study;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.db.entity.QStudy.study;

@Repository
public class QStudyRepositorySupport extends QuerydslRepositorySupport {

    private static JPAQueryFactory jpaQueryFactory;

    public QStudyRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        super(Study.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<Study> findByCondition(Integer generation, String region, Integer classNum, Boolean isPublic) {
        return jpaQueryFactory.selectFrom(study)
                .where(generationEq(generation),
                        regionEq(region),
                        classNumEq(classNum),
                        isPublicEq(isPublic))
                .fetch();
    }

    BooleanExpression generationEq(Integer generation) {
        if (generation == null) {
            return null;
        }
        return study.generation.eq(generation);
    }

    BooleanExpression regionEq(String region) {
        if (region == null) {
            return null;
        }
        return study.region.eq(region);
    }

    BooleanExpression classNumEq(Integer classNum) {
        if (classNum == null) {
            return null;
        }
        return study.classNum.eq(classNum);
    }

    BooleanExpression isPublicEq(Boolean isPublic) {
        if (isPublic == null) {
            return null;
        }
        return study.isPublic.eq(isPublic);
    }

}
