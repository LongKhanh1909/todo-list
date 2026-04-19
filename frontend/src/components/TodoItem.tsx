import { useState } from 'react';
import type { TodoResponse } from '../types/todo';

interface Props {
    todo: TodoResponse;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, updatedTodo: Partial<TodoResponse>) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const [editTitle, setEditTitle] = useState(todo.title);
    const [editContent, setEditContent] = useState(todo.content);

    const handleSave = () => {
        // Now passing number ID and Partial Request
        onUpdate(todo.id, { title: editTitle, content: editContent });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="p-6 border border-blue-200 rounded-2xl bg-white shadow-sm my-4 animate-in fade-in zoom-in-95 duration-200">
                <input
                    className="w-full text-lg font-bold bg-transparent outline-none mb-2 text-slate-800"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                    className="w-full text-sm bg-transparent outline-none mb-6 resize-none h-20 text-slate-600"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="flex justify-end items-center gap-6 border-t pt-4">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-xs font-black shadow-md shadow-blue-100 transition-all active:scale-95"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="group flex items-center justify-between py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors px-2 relative">
            <div className="flex items-start gap-3">
                <button
                    onClick={() => onToggle(todo.id)}
                    className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${todo.status === 'COMPLETED' ? 'bg-blue-600 border-blue-600' : 'border-slate-300 hover:border-blue-500'
                        }`}
                >
                    {todo.status === 'COMPLETED' && <span className="text-white text-[10px] font-bold">✓</span>}
                </button>

                <div>
                    <h3 className={`text-[15px] font-semibold ${todo.status === 'COMPLETED' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {todo.title}
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{todo.content}</p>
                    <div className="flex gap-2 mt-2">
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-500">Starts: {todo.startDate}</span>
                        <span className="text-[10px] bg-blue-50 px-2 py-0.5 rounded font-bold text-blue-600">Due: {todo.endDate}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <span className={`text-[10px] font-black uppercase tracking-widest ${todo.status === 'ONGOING' ? 'text-orange-500' : 'text-green-500'}`}>
                    {todo.status}
                </span>

                <div className="relative">
                    <button onClick={() => setShowMenu(!showMenu)} className="p-1 hover:bg-slate-200 rounded text-slate-400 font-bold">⋮</button>
                    {showMenu && (
                        <div className="absolute right-0 top-8 bg-white border border-slate-200 shadow-xl rounded-lg py-1 w-32 z-10">
                            <button onClick={() => { setIsEditing(true); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50">Edit Task</button>
                            <button onClick={() => { onDelete(todo.id); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-xs hover:bg-red-50 text-red-600">Delete</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoItem;