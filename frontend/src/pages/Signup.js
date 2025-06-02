// src/pages/Signup.js
import React, { useState } from "react";
import { register } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role: student
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    if (username.length < 4) {
      setError("Username must be at least 4 characters long.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateInputs()) return;

    console.log("🚀 Sending Role:", role);

    try {
      await register(username, email, password, role);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            {/* <option value="admin">Admin</option>  // Removed for security */} 
          </select>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
