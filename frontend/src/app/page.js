"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, deleteTask, bulkDeleteTasks, updateTask } from "../redux/tasksSlice";

export default function TasksPage() {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "" || newTaskDescription.trim() === "") {
      alert("Task title and description cannot be empty");
      return;
    }
    dispatch(addTask({ title: newTaskTitle, description: newTaskDescription }));
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const handleDeleteTask = (id) => {
    if (id === undefined) {
      console.error("Task ID is undefined");
      return;
    }
    console.log("Deleting task with ID:", id);
    dispatch(deleteTask(id));
  };

  const handleBulkDelete = () => {
    if (selectedTasks.length === 0) {
      alert("No tasks selected for deletion");
      return;
    }
    const taskIds = selectedTasks.map(id => parseInt(id, 10));
    console.log("Deleting tasks with IDs:", taskIds);
    dispatch(bulkDeleteTasks({ task_ids: taskIds }));
    setSelectedTasks([]);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditTaskTitle(task.title);
    setEditTaskDescription(task.description);
  };

  const handleUpdateTask = () => {
    if (editTaskTitle.trim() === "" || editTaskDescription.trim() === "") {
      alert("Task title and description cannot be empty");
      return;
    }
    dispatch(updateTask({ id: editingTask.id, task: { title: editTaskTitle, description: editTaskDescription } }));
    setEditingTask(null);
    setEditTaskTitle("");
    setEditTaskDescription("");
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
            <button onClick={() => handleEditTask(task)}>Edit</button>
          </li>
        ))}
      </ul>
      {selectedTasks.length > 0 && (
        <button onClick={handleBulkDelete} style={{ marginTop: "1rem" }}>
          Delete Selected Tasks
        </button>
      )}
      {editingTask && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Edit Task</h2>
          <input
            type="text"
            placeholder="Task Title"
            value={editTaskTitle}
            onChange={(e) => setEditTaskTitle(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Task Description"
            value={editTaskDescription}
            onChange={(e) => setEditTaskDescription(e.target.value)}
            style={{ display: "block", marginTop: "0.5rem" }}
          />
          <br />
          <button onClick={handleUpdateTask}>Update Task</button>
          <button onClick={() => setEditingTask(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}