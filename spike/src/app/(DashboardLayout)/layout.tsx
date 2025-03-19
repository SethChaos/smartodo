"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import theme from "@/utils/theme";
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store'; // Import the Redux store

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "25px",
  flexDirection: "column",
  backgroundColor: "transparent",
}));

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <Provider store={store}>
      <MainWrapper className="mainwrapper">

        <PageWrapper className="page-wrapper">


          {/* ------------------------------------------- */}
          {/* Sidebar */}
          {/* ------------------------------------------- */}

          <Sidebar
          />
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}
          <Box
            sx={{

              [theme.breakpoints.up("lg")]: {
                marginLeft: '270px',
              },
            }}
          >
            {/* ------------------------------------------- */}
            {/* Header */}
            {/* ------------------------------------------- */}
            <Container
              sx={{
                paddingTop: "20px",
                maxWidth: "1200px",
                minHeight: 'calc(100vh - 229px)'
              }}
            >


              {/* ------------------------------------------- */}
              {/* Page Route */}
              {/* ------------------------------------------- */}
              <Box>{children}</Box>



            </Container>
          </Box>
        </PageWrapper>
      </MainWrapper>
    </Provider>
  );
};

export default DashboardLayout;

