import { useRef } from "react";

export default function NewTask({ onAddTask }) {
    const taskInputRef = useRef();

    function handleNewTask() {
        const taskTitle = taskInputRef.current.value.trim();

        if (taskTitle) {
            onAddTask(taskTitle);
            taskInputRef.current.value = '';
        }
    }

    return (
        <div className="flex items-center gap-4">
            <input type='text' placeholder='Task Title' className="w-64 px-2 py-1 rounded-sm bg-stone-200" ref={taskInputRef} />
            <button className="text-stone-700 hover:text-stone-950" onClick={handleNewTask}>Add Task</button>
        </div>
    );
}