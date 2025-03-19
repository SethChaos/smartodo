import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of a task
interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// Define the state type
interface TasksState {
  items: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Initial state
const initialState: TasksState = {
  items: [],
  status: 'idle',
};

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk<Task[]>('tasks/fetchTasks', async () => {
  const response = await fetch('/api/tasks');
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }
  return response.json();
});

// Create the slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default tasksSlice.reducer;