import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BaseRouter } from "./routing/BaseRouter";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { RecoilRoot } from "recoil";
import { AuthHandleProvidor } from "./AuthHandleProvidor";

const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    primary: {
      main: "#111",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif;",
    h1: {
      fontWeight: 900,
      fontSize: "4rem",
    },
    h2: {
      fontWeight: 800,
      fontSize: "1.5rem",
    },
    h3: {
      fontWeight: 800,
      fontSize: "1.15rem",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <AuthHandleProvidor>
              <BaseRouter />
            </AuthHandleProvidor>
          </RecoilRoot>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
);
