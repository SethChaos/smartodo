'use client'
import { Grid2 as Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ProfitExpenses from '@/app/(DashboardLayout)/components/dashboard/ProfitExpenses';

//this is the main page
const Dashboard = () => {
  return (
    (<PageContainer title="Tasks Management" description="this is Tasks Management page">
      <Box>
          <Grid
            size={{
              xs: 12,
              lg: 12
            }}>
            <ProfitExpenses />
          </Grid>
        </Box>
    </PageContainer>)
  );
}

export default Dashboard;
