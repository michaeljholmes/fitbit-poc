import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme} from '@mui/material';
import { RecoilRoot } from 'recoil';
import { App } from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import { FitbitSync } from './components/FitBitSync';

const theme = createTheme();
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ToastContainer />
          <ThemeProvider theme={theme}>
            <FitbitSync />
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </BrowserRouter>
)
