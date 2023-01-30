package com.ssafy.db.entity;

import javax.persistence.*;

public class Region {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    User user;

}
