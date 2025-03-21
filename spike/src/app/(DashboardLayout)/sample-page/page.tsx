'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import Tasksdash from '@/app/(DashboardLayout)/sample-page/Tasksdash'; // Import the Tasksdash component

const SamplePage = () => {
  return (
    <PageContainer title="Dashboard" description="This is a Dashboard page">
      {/* Add the Tasksdash component */}
      <Tasksdash />
    </PageContainer>
  );
};

export default SamplePage;

