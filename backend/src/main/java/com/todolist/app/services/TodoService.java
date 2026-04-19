package com.todolist.app.services;

import com.todolist.app.dtos.Status;
import com.todolist.app.dtos.TodoRequest;
import com.todolist.app.dtos.TodoResponse;
import com.todolist.app.mappers.TodoMapper;
import com.todolist.app.models.Todo;
import com.todolist.app.repositories.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    private final TodoMapper todoMapper;

    public TodoResponse createTodo(TodoRequest todoRequest) {
        Todo newTodo = todoMapper.requestToTodo(todoRequest);
        newTodo.setStatus(Status.ONGOING);
        todoRepository.save(newTodo);
        return todoMapper.todoToResponse(newTodo);
    }

    public List<TodoResponse> getTodos() {
        return todoRepository.findAll()
                .stream()
                .map(todoMapper::todoToResponse)
                .toList();
    }

    public TodoResponse updateTodo(TodoRequest todoRequest, long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found!"));
        todoMapper.updateTodoFromRequest(todoRequest, todo);
        todoRepository.save(todo);
        return todoMapper.todoToResponse(todo);
    }

    public String deleteTodo(long todoId) {
        todoRepository.deleteById(todoId);
        return "Todo deleted!";
    }
}
