package com.todolist.app.mappers;

import com.todolist.app.dtos.TodoRequest;
import com.todolist.app.dtos.TodoResponse;
import com.todolist.app.models.Todo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TodoMapper {
    // Convert Request -> Entity
    // We ignore 'id' and 'status' because they usually aren't in a Request
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", ignore = true)
    Todo requestToTodo(TodoRequest todoRequest);

    // Convert Entity -> Response
    TodoResponse todoToResponse(Todo todo);

    // Update existing Entity from a Request
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", ignore = true)
    void updateTodoFromRequest(TodoRequest todoRequest, @MappingTarget Todo todo);
}
