'use client';

import { Grid2 as Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ProfitExpenses from '@/app/(DashboardLayout)/components/dashboard/ProfitExpenses';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store'; // Import the AppDispatch type
import { fetchTasks } from '@/redux/tasksSlice'; // Updated the import path
import { useEffect } from 'react';

// This is the main page
const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch(); // Type the dispatch correctly
  const tasks = useSelector((state: { tasks: { items: any[] } }) => state.tasks.items); // Access tasks from Redux state

  useEffect(() => {
    dispatch(fetchTasks()); // Fetch tasks when the component mounts
  }, [dispatch]);

  return (
    <PageContainer title="Tasks Management" description="This is the Tasks Management page">
      <Box>
        <Grid
          size={{
            xs: 12,
            lg: 12,
          }}
        >
          <ProfitExpenses /> {/* Pass tasks as props */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
