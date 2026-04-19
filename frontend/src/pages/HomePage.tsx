import React, { useState, useEffect } from 'react';
import TodoItem from '../components/TodoItem';
import { todoApi } from '../api/todoApi';
import type { TodoRequest, TodoResponse } from '../types/todo';

const HomePage = () => {
    const [todos, setTodos] = useState<TodoResponse[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true);

    // Inputs
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Fetch data
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const data = await todoApi.getTodos();
                setTodos(data);
            } catch (err) {
                console.error("Backend connection failed:", err);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    // Add task
    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const request: TodoRequest = { title, content, startDate, endDate };

        try {
            const savedTodo = await todoApi.createTodo(request);
            setTodos([...todos, savedTodo]);
            setIsAdding(false);
            resetForm();
        } catch (err) {
            console.error("Failed to add task:", err);
            alert("Check the format! Java expects 'yyyy-MM-dd HH:mm:ss'");
        }
    };

    // Update task
    const updateTodo = async (id: number, updatedFields: Partial<TodoRequest>) => {
        try {
            const updated = await todoApi.updateTodo(id, updatedFields);
            setTodos(todos.map(t => t.id === id ? updated : t));
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    // Delete task
    const deleteTodo = async (id: number) => {
        try {
            await todoApi.deleteTodo(id);
            setTodos(todos.filter(t => t.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    // Cancel button
    const resetForm = () => {
        setTitle(''); setContent(''); setStartDate(''); setEndDate('');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">CONNECTING TO SYSTEM...</div>;

    return (
        <div className="min-h-screen bg-white p-12">
            <div className="max-w-3xl mx-auto">
                <header className="mb-10 flex justify-between items-center pb-4 border-b border-slate-100">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Todo List</h1>
                    {!isAdding && (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-xl shadow-lg transition-all active:scale-95"
                        >
                            Add Task
                        </button>
                    )}
                </header>

                <div className="mb-10 flex flex-col gap-4">
                    {todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={() => { }}
                            onDelete={() => deleteTodo(todo.id)}
                            onUpdate={updateTodo}
                        />
                    ))}
                </div>

                {isAdding && (
                    <form onSubmit={addTask} className="border border-slate-200 rounded-3xl p-8 bg-white shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex flex-col gap-4">
                            <input
                                autoFocus
                                placeholder="Task Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-xl font-bold outline-none text-slate-800 placeholder:text-slate-300"
                            />
                            <textarea
                                placeholder="Description"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="text-sm outline-none resize-none h-24 text-slate-600 placeholder:text-slate-200"
                            />

                            <div className="flex gap-4 border-t border-slate-50 pt-6">
                                <div className="flex flex-col flex-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-1">Start Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="text-xs p-2.5 bg-slate-50 rounded-lg border border-slate-100 outline-none"
                                    />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 mb-1">Due Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="text-xs p-2.5 bg-blue-50 rounded-lg border border-blue-100 outline-none text-blue-600"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-end items-center gap-8 border-t pt-6">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="text-xs font-bold text-red-500 hover:text-red-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-xs font-black shadow-lg shadow-blue-100 transition-all active:scale-95"
                            >
                                Save Task
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default HomePage;