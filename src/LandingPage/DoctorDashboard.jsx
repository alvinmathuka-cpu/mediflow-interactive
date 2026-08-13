import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Activity,
  BarChart3,
  ArrowLeftRight,
  UserCheck,
  Siren,
} from "lucide-react";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";

function DoctorDashboard({name}) {
  const [activeTab, setActiveTab] = useState("Overview");
  return (
    <div className="dashboard-layout">
      {/* Sidebar Frame */}
      <aside className="sidebar">
        <div className="brand-header">
          <h2>EQUITY AFYA</h2>
          <span>CLINICAL OS</span>
        </div>
        <ul className="nav-list">
          <li
            className={`nav-item ${activeTab === "Overview" ? "active" : ""}`}
            onClick={() => setActiveTab("Overview")}
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </li>
          <li
            className={`nav-item ${activeTab === "My Patients" ? "active" : ""}`}
            onClick={() => setActiveTab("My Patients")}
          >
            <Users size={18} />
            <span>My Patients</span>
          </li>
          <li
            className={`nav-item ${activeTab === "OR Schedule" ? "active" : ""}`}
            onClick={() => setActiveTab("OR Schedule")}
          >
            <Stethoscope size={18} />
            <span>OR Schedule</span>
          </li>
          <li
            className={`nav-item ${activeTab === "ICU Monitor" ? "active" : ""}`}
            onClick={() => setActiveTab("ICU Monitor")}
          >
            <Activity size={18} />
            <span>ICU Monitor</span>
          </li>
          <li
            className={`nav-item ${activeTab === "Analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("Analytics")}
          >
            <BarChart3 size={18} />
            <span>Analytics</span>
          </li>

          {/* Divider line to separate sub-views from page route switching */}
          <hr
            style={{
              margin: "0.75rem 0",
              borderColor: "#e2e8f0",
              borderStyle: "solid",
            }}
          />

          {/* Switch to Patient Page Route */}
          <NavLink
            to="/patient"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            style={{ textDecoration: "none" }}
          >
            <ArrowLeftRight size={18} />
            <span>Switch to Patient Portal</span>
          </NavLink>
        </ul>
        <div className="user-profile-bottom">
          <div className="avatar-circle">{name[0]}</div>
          <div>
            <p style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              Dr. {name}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#64748b" }}>Cardiology</p>
          </div>
        </div>
      </aside>

      {/* Main Content Frame */}
      <main className="main-content">
        <div className="welcome-banner">
          <div>
            <h1>Welcome Back, Dr. {name}</h1>
            <p>System Overview for Cardiology Clinic & ICU Units</p>
          </div>
          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
            Today: Oct 11, 2024
          </span>
        </div>

        {/* Top Metrics Row */}
        <div className="metrics-grid">
          <div className="metric-card">
            <span style={{ color: "#0d9488", fontSize: "1.5rem" }}>●</span>
            <div>
              <div className="label">Patients Assigned Today</div>
              <div className="count">24</div>
            </div>
          </div>
          <div className="metric-card">
            <span style={{ color: "#eab308", fontSize: "1.5rem" }}>●</span>
            <div>
              <div className="label">Pending Surgeries</div>
              <div className="count">3</div>
            </div>
          </div>
          <div className="metric-card">
            <span style={{ color: "#ef4444", fontSize: "1.5rem" }}>●</span>
            <div>
              <div className="label">Critical ICU Cases</div>
              <div className="count">5</div>
            </div>
          </div>
        </div>

        {/* Two Column Layout Split */}
        <div className="dashboard-split">
          {/* Left Column */}
          <div>
            <div className="card">
              <div className="card-header">
                <span className="card-title">Patient Treatment History</span>
                <a
                  href="#view-all"
                  style={{
                    fontSize: "0.8rem",
                    color: "#0d9488",
                    textDecoration: "none",
                  }}
                >
                  View All Records
                </a>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Diagnosis</th>
                    <th>Treatment Plan</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Marcus Vance</strong>
                      <br />
                      <small style={{ color: "#64748b" }}>61 yo - M</small>
                    </td>
                    <td>Post-Myocardial Infarction</td>
                    <td>Beta-blocker titration, Echo follow-up</td>
                    <td>
                      <span className="badge badge-progress">In-Progress</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Elena Rostova</strong>
                      <br />
                      <small style={{ color: "#64748b" }}>42 yo - F</small>
                    </td>
                    <td>Mitral Valve Regurgitation</td>
                    <td>Mitral Valve Repair surgery</td>
                    <td>
                      <span className="badge badge-discharged">Discharged</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>David Chen</strong>
                      <br />
                      <small style={{ color: "#64748b" }}>67 yo - M</small>
                    </td>
                    <td>Acute Heart Failure</td>
                    <td>IV Furosemide, daily metabolic panels</td>
                    <td>
                      <span className="badge badge-critical">
                        Critical Support
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card">
              <div className="card-header">
                <span className="card-title">Operating Theater Status</span>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  Scheduler Panel
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <strong>Operating Theater A</strong>
                    <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      CABG (Coronary Bypass) - Dr. Jenkins + Dr. Roy
                    </p>
                  </div>
                  <span className="badge badge-critical">
                    08:30 - 11:00 BOOKED
                  </span>
                </div>
                <div
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <strong>Operating Theater B</strong>
                    <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      Available for Schedule • On-call response team ready
                    </p>
                  </div>
                  <span className="badge badge-discharged">AVAILABLE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="card">
              <div className="card-header">
                <span className="card-title">ICU Bed Availability</span>
              </div>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#64748b",
                  marginBottom: "1rem",
                }}
              >
                Total: 6 Beds • 3 Vacant (Teal) • 3 Occupied
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    padding: "0.5rem",
                    background: "#fee2e2",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                  }}
                >
                  <strong>Bed 101</strong>
                  <br />
                  David Chen
                </div>
                <div
                  style={{
                    padding: "0.5rem",
                    background: "#f3edc1",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                  }}
                >
                  <strong>Bed 102</strong>
                  <br />
                  Robert M.
                </div>
                <div
                  style={{
                    padding: "0.5rem",
                    background: "#ccfbf1",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                  }}
                >
                  <strong>Bed 103</strong>
                  <br />
                  Vacant
                </div>
              </div>
            </div>

            <div className="card">
              <span className="card-title">On-Call Actions</span>
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <button
                  style={{
                    padding: "0.6rem",
                    background: "white",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <Siren size={18} />
                  <span>Emergency</span>
                </button>
                <button
                  style={{
                    padding: "0.6rem",
                    background: "white",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <UserCheck size={18} />
                  <span>Physicians</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default DoctorDashboard;
