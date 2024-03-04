import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BaseRouter } from "./routing/BaseRouter";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Auth0Provider } from '@auth0/auth0-react';
import { RecoilRoot } from "recoil";

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
  <Auth0Provider
    domain="dev-yxk3603z484r631r.us.auth0.com"
    clientId="lhoExBR8df0K1DkXrp05t062fEzyZ2gV"
    authorizationParams={{
      redirect_uri: `${import.meta.env.VITE_URL}/dashboard`,
    }}
    useRefreshTokens={true}
    cacheLocation="localstorage"  
  >
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <BaseRouter />
          </RecoilRoot>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </Auth0Provider>
);
