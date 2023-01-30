package com.ssafy.db.entity;

import javax.persistence.*;

public class Generation {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String number;

    @ManyToOne
    User user;

}
