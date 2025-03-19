import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface DashboardData {
  total_tasks: number;
  modified_tasks: number;
  deleted_tasks: number;
}

interface DashboardState {
  data: DashboardData;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: DashboardState = {
  data: {
    total_tasks: 0,
    modified_tasks: 0,
    deleted_tasks: 0,
  },
  status: "idle",
};

// Async thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk<DashboardData>(
  "dashboard/fetchDashboardData",
  async () => {
    const response = await fetch("http://localhost:8000/dashboard");
    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data");
    }
    return response.json();
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default dashboardSlice.reducer;