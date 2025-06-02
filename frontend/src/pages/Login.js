import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser, setIsAuthenticated } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(username, password);

      // Debug logs
      console.log("🔐 Access Token:", data.access);
      console.log("👤 Role:", data.role);
      console.log("🆔 User ID:", data.user_id);
      if (data.student_id) console.log("🎓 Student ID:", data.student_id);
      if (data.faculty_id) console.log("👨‍🏫 Faculty ID:", data.faculty_id);

      // Validate required fields
      if (!data.access || !data.role || !data.user_id) {
        throw new Error("Missing required fields in response");
      }

      // Store credentials
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userId", data.user_id);

      // Store role-specific IDs
      if (data.role === "student" && data.student_id) {
        localStorage.setItem("studentId", data.student_id);
      } else {
        localStorage.removeItem("studentId");
      }

      if (data.role === "faculty" && data.faculty_id) {
        localStorage.setItem("facultyId", data.faculty_id);
      } else {
        localStorage.removeItem("facultyId");
      }

      // Set user context
      setCurrentUser({
        role: data.role,
        id: String(data.user_id),
        studentId: data.student_id || null,
        facultyId: data.faculty_id || null,
      });

      setIsAuthenticated(true);
      navigate(`/dashboard/${data.role}`);
    } catch (error) {
      console.error("❌ Login failed:", error);

      if (error.response && error.response.status === 401) {
        setError("Invalid username or password");
      } else if (error.message?.includes("Network Error")) {
        setError("Network error. Please check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
