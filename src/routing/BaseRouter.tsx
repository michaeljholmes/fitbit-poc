import { Route, Routes } from "react-router-dom";
import { Template } from "./Template";
import { LandingPage } from "../pages/LandingPage";
import { VerificationPage } from "../pages/VerificationPage";
import { CreateChallenge } from "../pages/Dashboard/CreateChallenge";
import { DashboardPage } from "../pages/Dashboard/DashboardPage";

export const BaseRouter = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="verification" element={<VerificationPage />} />
    <Route path="dashboard">
      <Route element={<Template />}>
        <Route index element={<DashboardPage />} />
        <Route path="test" element={<p>Test</p>} />
      </Route>
    </Route>
  </Routes>
);
