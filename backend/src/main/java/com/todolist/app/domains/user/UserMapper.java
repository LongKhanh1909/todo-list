package com.todolist.app.domains.user;

import com.todolist.app.domains.auth.RegisterRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "profileImageUrl", ignore = true)
    @Mapping(target = "todos", ignore = true)
    User registerRequestToUser(RegisterRequest userRequest);

    UserResponse userToResponse(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "todos", ignore = true)
    void updateUserFromRequest(UserRequest request, @MappingTarget User user);
}