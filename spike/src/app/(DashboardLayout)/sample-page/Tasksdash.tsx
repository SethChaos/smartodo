import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import { IconArrowUpLeft } from "@tabler/icons-react";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TrafficDistribution = () => {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    total_tasks: 0,
    modified_tasks: 0,
    deleted_tasks: 0,
  });

  // Fetch dashboard data from the backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get<{ total_tasks: number; modified_tasks: number; deleted_tasks: number }>("http://localhost:8000/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Chart colors
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const error = theme.palette.error.main;
  const secondary = theme.palette.secondary.light;

  // Chart options
  const optionscolumnchart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 170,
    },
    colors: [secondary, error, primary],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  // Chart data
  const seriescolumnchart: any = [
    dashboardData.total_tasks,
    dashboardData.deleted_tasks,
    dashboardData.modified_tasks,
  ];

  return (
    <DashboardCard title="Task Dashboard">
      <Grid container spacing={3}>
        {/* Column 1: Task Summary */}
        <Grid item xs={6} sm={7}>
          <Typography variant="h3" sx={{ fontWeight: "700" }}>
            {dashboardData.total_tasks} Tasks
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ mt: 1, alignItems: "center" }}
          >
            <Stack direction="row">
              <Avatar sx={{ bgcolor: secondary, width: 21, height: 21 }}>
                <IconArrowUpLeft width={18} color="#39B69A" />
              </Avatar>
              <Typography variant="subtitle2" sx={{ fontWeight: "600" }}>
                +{dashboardData.modified_tasks} Updated
              </Typography>
            </Stack>
            <Typography variant="subtitle2" color="textSecondary">
              {dashboardData.deleted_tasks} Deleted
            </Typography>
          </Stack>
          <Stack spacing={3} direction="row" sx={{ mt: 3 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: primary,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ fontSize: "12px" }}
              >
                Total Tasks
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: error,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ fontSize: "12px" }}
              >
                Deleted Tasks
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* Column 2: Chart */}
        <Grid item xs={6} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            width={"100%"}
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default TrafficDistribution;
