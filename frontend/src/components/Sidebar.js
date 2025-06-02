import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  FaUserGraduate,
  FaBook,
  FaChalkboardTeacher,
  FaBuilding,
  FaClipboardList,
} from "react-icons/fa";
import { useUser } from "../context/UserContext";

const Sidebar = () => {
  const { currentUser } = useUser();
  const role = currentUser?.role?.toLowerCase();

  if (!role) return null; // 🔹 Hide Sidebar if not logged in

  return (
    <Nav className="flex-column bg-light vh-100 p-3 sidebar">
      {/* ✅ Admin Sidebar */}
      {role === "admin" && (
        <>
          <Nav.Link as={NavLink} to="/students">
            <FaUserGraduate className="me-2" /> Manage Students
          </Nav.Link>
          <Nav.Link as={NavLink} to="/departments">
            <FaBuilding className="me-2" /> Manage Departments
          </Nav.Link>
          <Nav.Link as={NavLink} to="/courses">
            <FaBook className="me-2" /> Manage Courses
          </Nav.Link>
          <Nav.Link as={NavLink} to="/faculty">
            <FaChalkboardTeacher className="me-2" /> Manage Faculty
          </Nav.Link>
          <Nav.Link as={NavLink} to="/enrollment">
            <FaBuilding className="me-2" /> Manage Enrollments
          </Nav.Link>
          <Nav.Link as={NavLink} to="/exams">
            <FaClipboardList className="me-2" /> Manage Exams
          </Nav.Link>
          <Nav.Link as={NavLink} to="/results">
            <FaClipboardList className="me-2" /> Manage Results
          </Nav.Link>
        </>
      )}

      {/* ✅ Faculty Sidebar */}
      {role === "faculty" && (
        <>
          <Nav.Link as={NavLink} to="/courses">
            <FaBook className="me-2" /> My Courses
          </Nav.Link>
          <Nav.Link as={NavLink} to="/enrollment">
            <FaBuilding className="me-2" /> Manage Enrollments
          </Nav.Link>
          <Nav.Link as={NavLink} to="/exams">
            <FaClipboardList className="me-2" /> Exams
          </Nav.Link>
          <Nav.Link as={NavLink} to="/faculty">
            <FaChalkboardTeacher className="me-2" /> Manage Faculty
          </Nav.Link>
          <Nav.Link as={NavLink} to="/results">
            <FaClipboardList className="me-2" /> Results
          </Nav.Link>
        </>
      )}

      {/* ✅ Student Sidebar */}
      {role === "student" && (
        <>
          <Nav.Link as={NavLink} to="/courses">
            <FaBook className="me-2" /> Courses
          </Nav.Link>
          <Nav.Link as={NavLink} to="/exams">
            <FaClipboardList className="me-2" /> Exams
          </Nav.Link>
          <Nav.Link as={NavLink} to="/results">
            <FaClipboardList className="me-2" /> Results
          </Nav.Link>
          <Nav.Link as={NavLink} to="/enrollment">
            <FaBuilding className="me-2" /> My Enrollments
          </Nav.Link>
        </>
      )}
    </Nav>
  );
};

export default Sidebar;
