package com.todolist.app.domains.todo;

import com.todolist.app.domains.user.User;
import com.todolist.app.domains.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final UserRepository userRepository;
    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;

    public TodoResponse createTodo(TodoRequest todoRequest, long currentUserId) {
        Todo newTodo = todoMapper.requestToTodo(todoRequest);
        User user = userRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        newTodo.setUser(user);
        newTodo.setTodoStatus(TodoStatus.ONGOING);

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

    @Transactional
    public TodoResponse changeStatus(long todoId, TodoStatus newStatus) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + todoId));

        LocalDateTime now = LocalDateTime.now();
        boolean isPastDeadline = todo.getEndDate() != null && now.isAfter(todo.getEndDate());

        // Tick the button
        if (newStatus == TodoStatus.COMPLETED) {
            if (isPastDeadline) {
                todo.setTodoStatus(TodoStatus.LATE);
            }
            else {
                todo.setTodoStatus(TodoStatus.COMPLETED);
            }
        }
        // Untick the button
        else if (newStatus == TodoStatus.ONGOING) {
            if (isPastDeadline) {
                todo.setTodoStatus(TodoStatus.LATE);
            }
            else {
                todo.setTodoStatus(TodoStatus.ONGOING);
            }
        }
        // Different cases
        else {
            todo.setTodoStatus(newStatus);
        }

        Todo savedTodo = todoRepository.save(todo);
        return todoMapper.todoToResponse(savedTodo);
    }
}
