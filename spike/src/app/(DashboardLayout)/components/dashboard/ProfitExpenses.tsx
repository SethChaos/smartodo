import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Paper,
  IconButton,
  Checkbox,
} from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const ProfitExpenses = () => {
  // State for the new task
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [tasks, setTasks] = useState<{ id: number; title: string; description: string }[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]); // State for selected tasks

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get<{ id: number; title: string; description: string }[]>(
        "http://localhost:8000/tasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle adding a new task
  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) {
      alert("Task title is required.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/tasks", {
        title: newTaskTitle,
        description: newTaskDescription,
      });
      setNewTaskTitle("");
      setNewTaskDescription("");
      fetchTasks(); // Refresh the task list after adding a new task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${id}`);
      fetchTasks(); // Refresh the task list after deleting a task
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedTasks.map((id) => axios.delete(`http://localhost:8000/tasks/${id}`)));
      setSelectedTasks([]); // Clear selected tasks
      fetchTasks(); // Refresh the task list after bulk delete
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };

  // Handle editing a task
  const handleEditTask = (task: { id: number; title: string; description: string }) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  // Handle saving an edited task
  const handleSaveTask = async (id: number) => {
    try {
      await axios.put(`http://localhost:8000/tasks/${id}`, {
        title: editTitle,
        description: editDescription,
      });
      setEditingTaskId(null);
      setEditTitle("");
      setEditDescription("");
      fetchTasks(); // Refresh the task list after saving changes
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle canceling edit
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // Handle selecting a task
  const handleSelectTask = (id: number) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  // Handle selecting all tasks
  const handleSelectAllTasks = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]); // Deselect all
    } else {
      setSelectedTasks(tasks.map((task) => task.id)); // Select all
    }
  };

  return (
    <DashboardCard>
      <>
        {/* Title Bar */}
        
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Task Management
          </Typography>

        {/* Content */}
        <Grid container spacing={3} sx={{ padding: 2 }}>
          {/* Left Column: Add Task Form */}
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Add a New Task
              </Typography>
              <TextField
                fullWidth
                label="Task Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Task Description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleAddTask}>
                Add Task
              </Button>
            </Box>
          </Grid>

          {/* Right Column: Task List */}
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Task List
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={handleBulkDelete}
                disabled={selectedTasks.length === 0}
                sx={{ marginBottom: 2 }}
              >
                Delete Selected
              </Button>
              {tasks.length === 0 ? (
                <Typography variant="body1" color="textSecondary">
                  No tasks available.
                </Typography>
              ) : (
                <List>
                  <ListItem>
                    <Checkbox
                      checked={selectedTasks.length === tasks.length}
                      onChange={handleSelectAllTasks}
                    />
                    <Typography>Select All</Typography>
                  </ListItem>
                  {tasks.map((task) => (
                    <React.Fragment key={task.id}>
                      <Paper
                        elevation={3}
                        sx={{
                          borderRadius: 2,
                          padding: 2,
                          marginBottom: 2,
                        }}
                      >
                        <ListItem>
                          <Checkbox
                            checked={selectedTasks.includes(task.id)}
                            onChange={() => handleSelectTask(task.id)}
                          />
                          {editingTaskId === task.id ? (
                            <Box sx={{ width: "100%" }}>
                              <TextField
                                fullWidth
                                label="Title"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                sx={{ marginBottom: 1 }}
                              />
                              <TextField
                                fullWidth
                                label="Description"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                sx={{ marginBottom: 1 }}
                              />
                              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  startIcon={<SaveIcon />}
                                  onClick={() => handleSaveTask(task.id)}
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  startIcon={<CancelIcon />}
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </Button>
                              </Box>
                            </Box>
                          ) : (
                            <>
                              <ListItemText
                                primary={
                                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    {task.title}
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                                    {task.description || "No description"}
                                  </Typography>
                                }
                              />
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <IconButton color="primary" onClick={() => handleEditTask(task)}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDeleteTask(task.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </>
                          )}
                        </ListItem>
                      </Paper>
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Box>
          </Grid>
        </Grid>
      </>
    </DashboardCard>
  );
};

export default ProfitExpenses;