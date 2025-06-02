// src/components/FacultyForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import {
  addFaculty,
  updateFaculty,
  fetchDepartments,
} from "../services/api";
import { useUser } from "../context/UserContext";

const FacultyForm = ({ facultyToEdit, onFacultyAdded }) => {
  const { currentUser } = useUser();
  const [faculty, setFaculty] = useState({
    name: "",
    email: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");

  const isAdmin = currentUser?.role === "admin";
  const isFaculty = currentUser?.role === "faculty";

  const isOwnProfile =
    facultyToEdit?.faculty_id?.toString() === currentUser?.facultyId?.toString();

  useEffect(() => {
    loadDepartments();

    if (facultyToEdit) {
      setFaculty({
        name: facultyToEdit.name,
        email: facultyToEdit.email,
        department: facultyToEdit.department,
        faculty_id: facultyToEdit.faculty_id,
      });
    } else {
      setFaculty({
        name: "",
        email: "",
        department: "",
      });
    }
  }, [facultyToEdit]);

  const loadDepartments = async () => {
    try {
      const res = await fetchDepartments();
      setDepartments(res);
    } catch (err) {
      console.error("Failed to fetch departments:", err);
      setError("❌ Failed to load departments.");
    }
  };

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, department } = faculty;
    if (!name || !email || !department) {
      setError("❗ All fields are required.");
      return;
    }

    try {
      if (faculty.faculty_id) {
        if (isAdmin || (isFaculty && isOwnProfile)) {
          await updateFaculty(faculty.faculty_id, faculty);
        } else {
          setError("⛔ Unauthorized update attempt.");
          return;
        }
      } else {
        if (isAdmin) {
          await addFaculty(faculty);
        } else {
          setError("⛔ Only admin can add faculty.");
          return;
        }
      }

      setError("");
      onFacultyAdded("success", "✅ Faculty saved.");
    } catch (err) {
      console.error("Error saving faculty:", err);
      setError("❌ Failed to save faculty. Please check the input.");
    }
  };

  // Block faculty from seeing add form
  if (isFaculty && !facultyToEdit) {
    return (
      <Alert variant="info">
        👋 Welcome, Faculty. You can only view and update your profile.
      </Alert>
    );
  }

  return (
    <Card className="p-3">
      <h4>{faculty.faculty_id ? "✏️ Edit Faculty" : "➕ Add Faculty"}</h4>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={faculty.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
            disabled={isFaculty && !isOwnProfile}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={faculty.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
            disabled={isFaculty && !isOwnProfile}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Department</Form.Label>
          <Form.Select
            name="department"
            value={faculty.department}
            onChange={handleChange}
            required
            disabled={isFaculty && !isOwnProfile}
          >
            <option value="">-- Select Department --</option>
            {departments.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.department_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="success" className="mt-2">
          {faculty.faculty_id ? "Update Faculty" : "Add Faculty"}
        </Button>
      </Form>
    </Card>
  );
};

export default FacultyForm;
