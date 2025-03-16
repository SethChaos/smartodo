// This is the main page component that will be rendered by the client-side app.
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/tasksSlice";
import axios from "axios";

export default function TasksPage() {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleAddTask = async () => {
    await axios.post("http://localhost:8000/tasks", {
      title: newTaskTitle,
      description: newTaskDescription,
    });
    dispatch(fetchTasks());
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/tasks/${id}`);
    dispatch(fetchTasks());
  };
  
  const handleBulkDelete = async () => {
    await axios.delete("http://localhost:8000/tasks/bulk-delete", {
      data: { task_ids: selectedTasks },
    });
    setSelectedTasks([]);
    dispatch(fetchTasks());
  };

  return (
    <div>
      <h1>Task Management</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Task Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          style={{ display: "block", marginTop: "0.5rem" }}
        />
        <br />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      {status === "loading" && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "0.5rem" }}>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedTasks((prev) => [...prev, task.id]);
                } else {
                  setSelectedTasks((prev) => prev.filter((id) => id !== task.id));
                }
              }}
            />{" "}
            {task.title}{" "}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedTasks.length > 0 && (
        <button onClick={handleBulkDelete} style={{ marginTop: "1rem" }}>
          Delete Selected Tasks
        </button>
      )}
    </div>
  );
}
// This is the main page component that will be rendered by the client-side app.