import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "./components/Navbar";
//import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Faculty from "./pages/Faculty";
import Departments from "./pages/Departments";
import Enrollment from "./pages/Enrollment";
import Exams from "./pages/Exams";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useUser } from "./context/UserContext";

const App = () => {
  const { isAuthenticated, currentUser, logout } = useUser();

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navigation onLogout={logout} userRole={currentUser?.role} />
          <Container fluid>
            <Row>
              {/* <Col md={2} className="d-none d-md-block bg-light p-3">
                <Sidebar userRole={currentUser?.role} />
              </Col> */}
              <Col md={10} className="p-4">
                <Routes>
                  {/* ✅ Dashboards */}
                  <Route
                    path="/dashboard/admin"
                    element={
                      <PrivateRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/dashboard/faculty"
                    element={
                      <PrivateRoute allowedRoles={["faculty"]}>
                        <FacultyDashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/dashboard/student"
                    element={
                      <PrivateRoute allowedRoles={["student"]}>
                        <StudentDashboard />
                      </PrivateRoute>
                    }
                  />

                  {/* ✅ Admin Pages */}
                  <Route
                    path="/students"
                    element={
                      <PrivateRoute allowedRoles={["admin", "faculty", "student"]}>
                        <Students />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/courses"
                    element={
                      <PrivateRoute allowedRoles={["admin", "faculty", "student"]}>
                        <Courses />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/faculty"
                    element={
                      <PrivateRoute allowedRoles={["admin", "faculty"]}>
                        <Faculty />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/departments"
                    element={
                      <PrivateRoute allowedRoles={["admin"]}>
                        <Departments />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/enrollment"
                    element={
                      <PrivateRoute allowedRoles={["admin", "faculty", "student"]}>
                        <Enrollment />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/exams"
                    element={
                      <PrivateRoute allowedRoles={["admin", "faculty", "student"]}>
                        <Exams />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/results"
                    element={
                      <PrivateRoute allowedRoles={["admin", "faculty", "student"]}>
                        <Results currentUser={currentUser} />
                      </PrivateRoute>
                    }
                  />

                  {/* ✅ Redirect Unknown Routes */}
                  <Route
                    path="*"
                    element={
                      currentUser?.role ? (
                        <Navigate to={`/dashboard/${currentUser.role}`} />
                      ) : (
                        <Navigate to="/" />
                      )
                    }
                  />
                </Routes>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
