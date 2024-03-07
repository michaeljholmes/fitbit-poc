import { Route, Routes, useSearchParams } from "react-router-dom";
import { Template } from "./Template";
import { LandingPage } from "../pages/LandingPage";
import { VerificationPage } from "../pages/VerificationPage";
import { DemoPage } from "../pages/DemoPage"
import { DashboardPage } from "../pages/Dashboard/DashboardPage";
import { FitBitIntegration } from "../pages/Dashboard/FitBitIntegration";
import { JoinCompetitionViaLink } from "../pages/JoinCompetitionViaLink";
import { useAsync } from "react-use";
import { Typography } from "@mui/material";
import { useState } from "react";
import { LoadingContainer } from "../components/LoadingContainer";

export const BaseRouter = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<{code?: string, state?: string}>({code: undefined, state: undefined});

  const {loading } = useAsync(async () => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (!state) return;
    if (!code) return;
    try {
      searchParams.delete('code');
      searchParams.delete('state');
      setSearchParams(searchParams);
      setValue({
        code,
        state
      });
    } catch (e) {
      // Probably use toast notifications for errors
      return undefined;
    }
  }, [searchParams]);

  if(loading){
    return <LoadingContainer/>;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="join-competition" element={<JoinCompetitionViaLink />} />
      <Route path="verification" element={<VerificationPage />} />
      <Route path="dashboard">
        <Route element={<Template />}>
          <Route index element={<DashboardPage />} />
          <Route path="tracker" element={<FitBitIntegration code={value?.code} state={value?.state}/>} />
        </Route>
      </Route>
    </Routes>
  )
};
