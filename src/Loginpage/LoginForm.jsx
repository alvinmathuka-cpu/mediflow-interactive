/* Structure Skeleton For the login page outlook */
import React, { useState } from "react";
import "./UserForm.css";

export default function UserForm() {
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nDOB: ${dob}\nGender: ${gender}`);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="card">
        <h2>User Details</h2>
        {/* Referencing for Doctor or Patient */}
        <div className="switch">
          <label>Identify</label>
          <div className="radio-options">
            <label className="Patient">
              <input
                type="radio"
                name="role"
                value="patient"
                onChange={(e) => setRole(e.target.value)}
                required
              />
              patient
            </label>
            <label className="Doctor">
              <input
                type="radio"
                name="role"
                value="Doctor"
                onChange={(e) => setRole(e.target.value)}
              />
              Doctor
            </label>
          </div>
        </div>

        {/* Email */}
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Date of Birth (DD/MM/YYYY) */}
        <div className="field">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>

        {/* Gender */}
        <div className="field">
          <label>Gender</label>
          <div className="radio-options">
            <label className="Gender">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Female
            </label>

            <label className="Gender">
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>

            <label className="Gender">
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}
