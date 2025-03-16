// This is the layout component that wraps all pages in the app. It includes the header and the main content area.
"use client"; // Required for any layout that uses client-side providers like Redux

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Todo App</title>
      </head>
      <body>
        <Provider store={store}>
          <header style={{ padding: "1rem", background: "#f1f1f1" }}>
            <nav>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  gap: "1rem",
                  margin: 0,
                  padding: 0,
                }}
              >
                <li>
                  <Link href="/">Tasks</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </nav>
          </header>
          <main style={{ padding: "1rem" }}>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
