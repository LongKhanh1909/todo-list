package com.todolist.app.domains.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private long id;

    private String username;

    private String email;

    private String profileImageUrl;
}
