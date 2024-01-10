import { Route, Routes } from "react-router-dom";
import { App } from "../App";
import { Template } from "./Template";
import { LandingPage } from "../pages/LandingPage";

export const BaseRouter = () => 
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="dashboard">
            <Route element={<Template />}>
                <Route index element={<App/>} />
                <Route path="test" element={<p>Test</p>} />        
            </Route>
        </Route>
    </Routes>