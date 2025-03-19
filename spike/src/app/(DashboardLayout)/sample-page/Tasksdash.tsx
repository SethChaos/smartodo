import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import { IconArrowUpLeft } from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { fetchDashboardData } from "../../../redux/dashboardSlice"; // Import the Redux action
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TrafficDistribution = () => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();

  // Access dashboard data and status from Redux
  const { total_tasks, modified_tasks, deleted_tasks } = useSelector(
    (state: RootState) => state.dashboard.data
  );
  const status = useSelector((state: RootState) => state.dashboard.status);

  // Fetch dashboard data when the component mounts
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDashboardData());
    }
  }, [dispatch, status]);

  // Chart colors
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
  const seriescolumnchart: any = [total_tasks, deleted_tasks, modified_tasks];

  return (
    <DashboardCard title="Task Dashboard">
      <Grid container spacing={3}>
        {/* Column 1: Task Summary */}
        <Grid item xs={6} sm={7}>
          <Typography variant="h3" sx={{ fontWeight: "700" }}>
            {total_tasks} Tasks
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
                +{modified_tasks} Updated
              </Typography>
            </Stack>
            <Typography variant="subtitle2" color="textSecondary">
              {deleted_tasks} Deleted
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
