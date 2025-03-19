"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./global.css";
import { DashboardContextProvider } from './context/DashboardContext';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          <DashboardContextProvider>
            <Provider store={store}>
              <CssBaseline />
              {children}
            </Provider>
          </DashboardContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
