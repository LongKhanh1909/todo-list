import axios from 'axios';
import type { TodoRequest, TodoResponse } from '../types/todo';

// Axios works outside the BE, it likes the Requestor
// Axios is on the Client side, Controller is on the Server side
// Basically, this is likely @RequestMapping from Spring
const api = axios.create({
    baseURL: 'http://localhost:8080/api/todos',
});

const formatDateTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return "";
    // If the string is YYYY-MM-DDTHH:mm, turn it into YYYY-MM-DD HH:mm:00
    return dateTimeStr.replace('T', ' ') + ":00";
};

export const todoApi = {
    // Similar to @GetMapping in Spring
    // GET all todos
    // We expect an array of TodoResponse from the backend
    getTodos: async (): Promise<TodoResponse[]> => {
        const response = await api.get<TodoResponse[]>('');
        return response.data;
    },

    // Similar to @PostMapping in Spring
    // POST a new todo
    // Takes a TodoRequest, returns the TodoResponse
    createTodo: async (data: TodoRequest): Promise<TodoResponse> => {
        const payload = {
            ...data,
            startDate: formatDateTime(data.startDate),
            endDate: formatDateTime(data.endDate),
        };
        const response = await api.post<TodoResponse>('', payload);
        return response.data;
    },

    // Similar to @PutMapping
    // PUT a todo
    // Since we don't want to update the Status so we'll use Partial
    // Partial means update some parts of the type
    updateTodo: async (id: number, data: Partial<TodoRequest>): Promise<TodoResponse> => {
        const payload = { ...data };
        if (payload.startDate) payload.startDate = formatDateTime(payload.startDate);
        if (payload.endDate) payload.endDate = formatDateTime(payload.endDate);

        const response = await api.put<TodoResponse>(`/${id}`, payload);
        return response.data;
    },

    // Similar to @DeleteMapping
    // DELETE a todo
    // In the Controller, the deleteTodo() returns String type, therefore the Promise type must also be a String
    deleteTodo: async (id: number): Promise<string> => {
        const response = await api.delete<string>(`/${id}`, {
            responseType: 'text'
        });
        return response.data;
    }
};

// Copy the Controller to FE style