import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import tasksReducer from "./tasksSlice"; // Import the tasks reducer

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer, // Dashboard reducer
    tasks: tasksReducer,         // Tasks reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;