package com.todolist.app.domains.todo;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TodoMapper {
    // Convert Request -> Entity
    // We ignore 'id' and 'status' because they usually aren't in a Request
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "todoStatus", ignore = true)
    @Mapping(target = "user", ignore = true)
    Todo requestToTodo(TodoRequest todoRequest);

    // Convert Entity -> Response
    @Mapping(source = "user.id", target = "userId")
    TodoResponse todoToResponse(Todo todo);

    // Update existing Entity from a Request
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "todoStatus", ignore = true)
    @Mapping(target = "user", ignore = true)
    void updateTodoFromRequest(TodoRequest todoRequest, @MappingTarget Todo todo);
}
