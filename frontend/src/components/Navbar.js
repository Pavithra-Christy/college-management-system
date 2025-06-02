import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaBook,
  FaChalkboardTeacher,
  FaBuilding,
  FaClipboardList,
} from "react-icons/fa";
import { useUser } from "../context/UserContext";

const Navigation = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useUser();
  const role = currentUser?.role;
  const normalizedRole = role?.toLowerCase();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavLinkClick = () => {
    const navbar = document.querySelector(".navbar-collapse");
    if (navbar?.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3 px-3">
      <Container fluid>
        {/* ✅ Dashboard Title Link */}
        <Navbar.Brand
          as={Link}
          to={role ? `/dashboard/${normalizedRole}` : "/"}
          className="me-3"
        >
          {role
            ? `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`
            : "College Management System"}
        </Navbar.Brand>

        {/* ✅ Toggle button for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {normalizedRole === "admin" && (
              <>
                <Nav.Link as={Link} to="/students" onClick={handleNavLinkClick}>
                  <FaUserGraduate className="me-2" /> Manage Students
                </Nav.Link>
                <Nav.Link as={Link} to="/departments" onClick={handleNavLinkClick}>
                  <FaBuilding className="me-2" /> Manage Departments
                </Nav.Link>
                <Nav.Link as={Link} to="/courses" onClick={handleNavLinkClick}>
                  <FaBook className="me-2" /> Manage Courses
                </Nav.Link>
                <Nav.Link as={Link} to="/faculty" onClick={handleNavLinkClick}>
                  <FaChalkboardTeacher className="me-2" /> Manage Faculty
                </Nav.Link>
                <Nav.Link as={Link} to="/enrollment" onClick={handleNavLinkClick}>
                  <FaBuilding className="me-2" /> Manage Enrollments
                </Nav.Link>
                <Nav.Link as={Link} to="/exams" onClick={handleNavLinkClick}>
                  <FaClipboardList className="me-2" /> Manage Exams
                </Nav.Link>
                <Nav.Link as={Link} to="/results" onClick={handleNavLinkClick}>
                  <FaClipboardList className="me-2" /> Manage Results
                </Nav.Link>
              </>
            )}

            {normalizedRole === "faculty" && (
              <>
                <Nav.Link as={Link} to="/courses" onClick={handleNavLinkClick}>
                  <FaBook className="me-2" /> My Courses
                </Nav.Link>
                <Nav.Link as={Link} to="/exams" onClick={handleNavLinkClick}>
                  <FaClipboardList className="me-2" /> Exams
                </Nav.Link>
                <Nav.Link as={Link} to="/results" onClick={handleNavLinkClick}>
                  <FaClipboardList className="me-2" /> Results
                </Nav.Link>
              </>
            )}

            {normalizedRole === "student" && (
              <>
                <Nav.Link as={Link} to="/courses" onClick={handleNavLinkClick}>
                  <FaBook className="me-2" /> Courses
                </Nav.Link>
                <Nav.Link as={Link} to="/exams" onClick={handleNavLinkClick}>
                  <FaClipboardList className="me-2" /> Exams
                </Nav.Link>
                <Nav.Link as={Link} to="/results" onClick={handleNavLinkClick}>
                  <FaClipboardList className="me-2" /> Results
                </Nav.Link>
                <Nav.Link as={Link} to="/enrollment" onClick={handleNavLinkClick}>
                  <FaBuilding className="me-2" /> My Enrollments
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* ✅ Logout button (right side on large screens) */}
          {role && (
            <div className="d-none d-lg-block">
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}

          {/* ✅ Logout button (mobile dropdown) */}
          {role && (
            <div className="d-lg-none mt-3">
              <Button variant="outline-light" onClick={handleLogout} className="w-100">
                Logout
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
