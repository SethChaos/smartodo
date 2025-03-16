// app/dashboard/page.js
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    total_tasks: 0,
    modified_tasks: 0,
    deleted_tasks: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/dashboard");
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>Total Tasks: {dashboardData.total_tasks}</div>
      <div>Modified Tasks: {dashboardData.modified_tasks}</div>
      <div>Deleted Tasks: {dashboardData.deleted_tasks}</div>
    </div>
  );
}
