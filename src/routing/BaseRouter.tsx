import { Route, Routes } from "react-router-dom";
import { Template } from "./Template";
import { LandingPage } from "../pages/LandingPage";
import { VerificationPage } from "../pages/VerificationPage";
import { DemoPage } from "../pages/DemoPage"
import { DashboardPage } from "../pages/Dashboard/DashboardPage";
import { FitBitIntegration } from "../pages/Dashboard/FitBitIntegration";
import { JoinCompetitionViaLink } from "../pages/JoinCompetitionViaLink";
import { HandleFitbitAuth } from "../pages/HandleFitbitAuth";

export const BaseRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="join-competition" element={<JoinCompetitionViaLink />} />
      <Route path="verification" element={<VerificationPage />} />
      <Route path="handle-fitbit" element={<HandleFitbitAuth />} />
      <Route path="dashboard">
        <Route element={<Template />}>
          <Route index element={<DashboardPage />} />
          <Route path="tracker" element={<FitBitIntegration/>} />
        </Route>
      </Route>
    </Routes>
  )
};
