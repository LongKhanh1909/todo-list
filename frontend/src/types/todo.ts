export type TodoStatus = 'ONGOING' | 'LATE' | 'COMPLETED';

export interface TodoRequest {
    title: string;
    content: string;
    startDate: string;
    endDate: string;
}

export interface TodoResponse {
    id: number;
    title: string;
    content: string;
    startDate: string;
    endDate: string;
    status: TodoStatus;
}

// Copy the DTOs type to FE