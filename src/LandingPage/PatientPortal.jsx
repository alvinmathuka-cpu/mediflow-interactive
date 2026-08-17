import { useState } from "react";
import "./Dashboard.css";
import {
  Calendar,
  Hospital,
  LayoutDashboard,
  FileText,
  MessageSquare,
  CreditCard,
  ArrowLeftRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import PreRegisterForm from "../PreRegisterForm/preRegisterForm";
import { useMediflowData } from "../context/DataContext";

export default function PatientPortal({name}) {
  const [activeTab, setActiveTab] = useState("Health Hub");
  const [showPreRegisterForm, setShowPreRegisterForm] = useState(false);
  const { db, patientService, notificationService } = useMediflowData();
  const loginName = name || "";
  const patients = db.patients.getAll();
  const patient = patients.find((p) => `${p.first_name} ${p.last_name}`.toLowerCase() === loginName.toLowerCase()) || patients[0];
  const profile = patient ? patientService.getPatientProfile(patient.patient_id) : null;
  const appointments = profile?.upcomingAppointments.slice(0, 2) || [];
  const prescriptions = profile?.activePrescriptions.slice(0, 3) || [];
  const notifications = patient ? notificationService.getForUser(patient.user_id).slice(0, 3) : [];
  const patientName = loginName || (patient ? `${patient.first_name} ${patient.last_name}` : "Patient");
  const showHub = activeTab === "Health Hub";
  const showAppointments = showHub || activeTab === "Appointments";
  const showRecords = showHub || activeTab === "My Records";
  const showMessages = showHub || activeTab === "Messages";
  const showBilling = showHub || activeTab === "Billing & Insurance";

  const formatDate = (date) => new Date(date).toLocaleDateString();
  const getStaffName = (staffId) => {
    const staff = db.staff.getById(staffId);
    return staff ? `Dr. ${staff.first_name} ${staff.last_name}` : "Care Team";
  };
  const getRoomName = (roomId) => {
    const room = db.rooms.getById(roomId);
    return room ? `ROOM ${room.room_number}` : "Room TBC";
  };
  const getPrescriptionItems = (prescriptionId) => {
    return db.prescriptionItems.findBy("prescription_id", prescriptionId);
  };
  const getDrugName = (drugId) => {
    return db.drugs.getById(drugId)?.name || "Medication";
  };

  let futureDate = new Date;
  futureDate.setDate(futureDate.getDate() + 4);

  futureDate = futureDate.toLocaleDateString();

  return (
    <div className="dashboard-layout">
      {/* Sidebar Frame */}
      <aside className="sidebar">
        <div className="brand-header">
          <h2>MEDIFLOW</h2>
          <span>Clinical OS</span>
        </div>

        <ul className="nav-list">
          {/* Health Hub */}
          <li
            className={`nav-item ${activeTab === "Health Hub" ? "active" : ""}`}
            onClick={() => setActiveTab("Health Hub")}
          >
            <LayoutDashboard size={18} />
            <span>Health Hub</span>
          </li>

          {/* Appointments */}
          <li
            className={`nav-item ${activeTab === "Appointments" ? "active" : ""}`}
            onClick={() => setActiveTab("Appointments")}
          >
            <Calendar size={18} />
            <span>Appointments</span>
          </li>

          {/* My Records */}
          <li
            className={`nav-item ${activeTab === "My Records" ? "active" : ""}`}
            onClick={() => setActiveTab("My Records")}
          >
            <FileText size={18} />
            <span>My Records</span>
          </li>

          {/* Messages */}
          <li
            className={`nav-item ${activeTab === "Messages" ? "active" : ""}`}
            onClick={() => setActiveTab("Messages")}
          >
            <MessageSquare size={18} />
            <span>Messages</span>
          </li>

          {/* Billing & Insurance */}
          <li
            className={`nav-item ${activeTab === "Billing & Insurance" ? "active" : ""}`}
            onClick={() => setActiveTab("Billing & Insurance")}
          >
            <CreditCard size={18} />
            <span>Billing & Insurance</span>
          </li>

          <hr style={{ margin: "0.75rem 0", borderColor: "#e2e8f0" }} />

          {/* Switch to Doctor View Route */}
          <NavLink
            to="/doctor"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            style={{ textDecoration: "none" }}
          >
            <ArrowLeftRight size={18} />
            <span>Switch to Doctor View</span>
          </NavLink>
        </ul>

        <div className="user-profile-bottom">
          <div className="avatar-circle">{patientName[0]}</div>
          <div>
            <p style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              {patientName}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
              MRN: #{patient?.patient_id || "284-092-04"}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Frame */}
      <main className="main-content">
        {/* Teal Header Banner */}
        <div className="welcome-banner teal">
          <div>
            <h1>Hello, {patientName}</h1>
            <p>
              Your recovery is on track. Remember to log your morning vitals
              before 10:00 AM today.
            </p>
          </div>
          <span
            className="badge"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
          >
            Care Plan Active
          </span>
        </div>

        <div className="dashboard-split">
          {/* Main Left Section */}
          <div>
            {showAppointments && <div className="card">
              <div className="card-header">
                <span className="card-title">Scheduled Medical Visits</span>
              </div>
              <div className="doctor-card-grid">
                {appointments.map((appointment) => (
                <div className="doctor-card" key={appointment.appointment_id}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div className="avatar-circle">{getStaffName(appointment.staff_id).split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
                    <div>
                      <strong>{getStaffName(appointment.staff_id)}</strong>
                      <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        {appointment.department}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    <Calendar size={18} />
                    <span>{formatDate(appointment.scheduled_datetime)} - {appointment.purpose}</span>
                  </p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#64748b",
                      marginBottom: "1rem",
                    }}
                  >
                    <Hospital size={18} />
                    <span>{getRoomName(appointment.room_id)}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowPreRegisterForm(true)}
                    style={{
                      width: "100%",
                      padding: "0.4rem",
                      background: "#f1f5f9",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Pre-Register Form
                  </button>
                </div>
                ))}
              </div>
            </div>}

            {showPreRegisterForm && (
              <PreRegisterForm
                onClose={() => setShowPreRegisterForm(false)}
                onSuccess={() => setShowPreRegisterForm(false)}
              />
            )}

            {showRecords && <div className="card">
              <span className="card-title">Recent Care Activity</span>
              <ul
                style={{
                  listStyle: "none",
                  marginTop: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {prescriptions.map((prescription) => (
                <li
                  key={prescription.prescription_id}
                  style={{
                    paddingBottom: "0.75rem",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <strong>{prescription.diagnosis}</strong>
                  <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {getPrescriptionItems(prescription.prescription_id).map((item) => getDrugName(item.drug_id)).join(", ") || prescription.notes}
                  </p>
                </li>
                ))}
                {showMessages && notifications.map((notification) => (
                <li
                  key={notification.notification_id}
                  style={{
                    paddingBottom: "0.75rem",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <strong>{notification.type.replace("_", " ")}</strong>
                  <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {notification.message}
                  </p>
                </li>
                ))}
              </ul>
            </div>}
          </div>

          {/* Right Sidebar Section */}
          <div>
            {showAppointments && <div
              className="card"
              style={{ background: "#fffbe1", borderColor: "#fef08a" }}
            >
              <span
                className="card-title"
                style={{ color: "#854d0e", fontSize: "0.85rem" }}
              >
                Upcoming Procedure
              </span>
              <h3 style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
                {appointments[0]?.purpose || "Diagnostic Cardiac Catheterization"}
              </h3>
              <p
                style={{
                  fontSize: "0.8rem",
                  margin: "0.5rem 0 1rem 0",
                  color: "#854d0e",
                }}
              >
                Clinician: {appointments[0] ? getStaffName(appointments[0].staff_id) : "Dr. Sarah Jenkins"}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong>{appointments[0] ? formatDate(appointments[0].scheduled_datetime) : futureDate}</strong>
                <span className="badge badge-confirmed">Confirmed</span>
              </div>
            </div>}

            {showBilling && <div className="card">
              <span className="card-title">Need Assistance?</span>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#64748b",
                  marginTop: "0.5rem",
                }}
              >
                On-Call Nurse Hotline
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#0d9488",
                  margin: "0.25rem 0",
                }}
              >
                +1 (800) 555-0199
              </p>
              <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                Emergency Room Location:
                <br />
                North Pavilion, Entrance 2
              </p>
            </div>}
          </div>
        </div>
      </main>
    </div>
  );
}
