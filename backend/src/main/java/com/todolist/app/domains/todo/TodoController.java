package com.todolist.app.domains.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoResponse> createTodo(
            @RequestBody TodoRequest request,
            @RequestParam long userId) {
        return new ResponseEntity<>(todoService.createTodo(request, userId), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<TodoResponse>> getAllTodos() {
        return new ResponseEntity<>(todoService.getTodos(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoResponse> updateTodo(@PathVariable long id, @RequestBody TodoRequest request) {
        return new ResponseEntity<>(todoService.updateTodo(request, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable long id) {
        return new ResponseEntity<>(todoService.deleteTodo(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TodoResponse> changeStatus(
            @PathVariable long id,
            @RequestParam TodoStatus newStatus) {
        TodoResponse updatedTodo = todoService.changeStatus(id, newStatus);
        return ResponseEntity.ok(updatedTodo);
    }
}
