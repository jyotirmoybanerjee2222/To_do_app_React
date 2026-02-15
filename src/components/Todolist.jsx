// TodoList.jsx - UPDATED
import React, { useState } from "react";
import Chatbot from "./Chatbot";

function TodoList() {
    const [task, setTask] = useState(["Meditation"]);
    const [newTask, setNewTask] = useState("");
    const [completedTasks, setCompletedTasks] = useState([]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTask(t => [...t, newTask]);
            setNewTask("");
        }
    }

    // Chatbot-friendly version that accepts task name directly
    function addTaskFromChatbot(taskName) {
        if (taskName.trim() !== "") {
            setTask(t => [...t, taskName.trim()]);
        }
    }

    function deleteTask(index) {
        const updateTasks = task.filter((element, i) => i !== index);
        setTask(updateTasks);
        // Remove from completed if it was completed
        setCompletedTasks(completedTasks.filter(i => i !== index).map(i => i > index ? i - 1 : i));
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updateTasks = [...task];
            [updateTasks[index], updateTasks[index - 1]] = [updateTasks[index - 1], updateTasks[index]];
            setTask(updateTasks);
            // Update completed indices
            setCompletedTasks(completedTasks.map(i => {
                if (i === index) return index - 1;
                if (i === index - 1) return index;
                return i;
            }));
        }
    }

    function moveTaskDown(index) {
        if (index < task.length - 1) {
            const updateTasks = [...task];
            [updateTasks[index], updateTasks[index + 1]] = [updateTasks[index + 1], updateTasks[index]];
            setTask(updateTasks);
            // Update completed indices
            setCompletedTasks(completedTasks.map(i => {
                if (i === index) return index + 1;
                if (i === index + 1) return index;
                return i;
            }));
        }
    }

    function toggleComplete(index) {
        if (completedTasks.includes(index)) {
            setCompletedTasks(completedTasks.filter(i => i !== index));
        } else {
            setCompletedTasks([...completedTasks, index]);
        }
    }

    return (
        <div className="app-container">
            <div className="to-do-list">
                <h1>To-Do-List</h1>
                <div>
                    <input type="text" placeholder="Enter a task.."
                        value={newTask}
                        onChange={handleInputChange} />

                    <button className="add-button" onClick={addTask}>Add </button>
                </div>
                <ol>
                    {task.map((taskItem, index) =>
                        <li key={index}>
                            <span className={completedTasks.includes(index) ? "text completed" : "text"}>
                                {taskItem}
                            </span>
                            <button className="complete-button" onClick={() => toggleComplete(index)}>
                                {completedTasks.includes(index) ? "Completed" : "✓"}
                            </button>
                            <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                            <button className="move-button" onClick={() => moveTaskUp(index)}>UP</button>
                            <button className="move-button" onClick={() => moveTaskDown(index)}>Down</button>
                        </li>
                    )}
                </ol>
            </div>
            
            <Chatbot
                tasks={task}
                onAddTask={addTaskFromChatbot}
                onDeleteTask={deleteTask}
                onMoveTaskUp={moveTaskUp}
                onMoveTaskDown={moveTaskDown}
            />
        </div>
    );
}

export default TodoList;