import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DoctorDashboard from "./LandingPage/DoctorDashboard";
import PatientPortal from "./LandingPage/PatientPortal";
import LoginForm from "./Login page/LoginForm";
import "./LandingPage/Dashboard.css"; // Ensure this path matches your CSS file location

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirect root URL "/" to "/doctor" by default */}
        {/* <Route path="/" element={<Navigate to="/doctor" replace />} /> */}
        <Route path="/" element={<LoginForm/>}/>

        {/* Main Routes */}
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/patient" element={<PatientPortal />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
