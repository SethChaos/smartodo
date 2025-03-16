// Code to create the Redux store and export it so that it can be used in the application.
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
