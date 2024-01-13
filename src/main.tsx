import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BaseRouter } from "./routing/BaseRouter";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    primary: {
      main: "#111"
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif;",
    h1: {
      fontWeight: 900,
      fontSize: "4rem"
    },
    h2: {
      fontWeight: 800,
      fontSize: "1.5rem"
    },
    h3: {
      fontWeight: 800,
      fontSize: "1.15rem"
    }
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BaseRouter />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
