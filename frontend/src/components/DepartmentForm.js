// src/components/DepartmentForm.js
import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import {
  addDepartment,
  updateDepartment,
  fetchFaculty,
} from "../services/api";

const DepartmentForm = ({ departmentToEdit, onDepartmentAdded }) => {
  const [name, setName] = useState("");
  const [hod, setHod] = useState("");
  const [facultyList, setFacultyList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (departmentToEdit) {
      setName(departmentToEdit.department_name);
      setHod(departmentToEdit.hod || "");
      loadFacultyForDepartment(departmentToEdit.department_name);
    } else {
      setName("");
      setHod("");
      setFacultyList([]);
    }
  }, [departmentToEdit]);

  const loadFacultyForDepartment = async (departmentName) => {
    try {
      const data = await fetchFaculty();
      const filtered = data.filter(
        (fac) => fac.department?.department_name === departmentName
      );
      setFacultyList(filtered);
    } catch (err) {
      setError("❌ Failed to load faculty list.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userRole = (localStorage.getItem("role") || "").toLowerCase();
    if (userRole !== "admin") {
      setError("Unauthorized access");
      return;
    }

    if (!name.trim()) {
      setError("Department name is required");
      return;
    }

    try {
      const payload = {
        department_name: name.trim(),
        hod,
      };

      if (departmentToEdit) {
        await updateDepartment(departmentToEdit.department_id, payload);
        setSuccess("✅ Department updated successfully!");
      } else {
        await addDepartment(payload);
        setSuccess("✅ Department created successfully!");
      }

      setError("");
      onDepartmentAdded();
      setName("");
      setHod("");
      setFacultyList([]);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("❌ Failed to save department.");
    }
  };

  return (
    <Card className="p-3">
      <h4>{departmentToEdit ? "✏️ Edit Department" : "➕ Add Department"}</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Department Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!departmentToEdit) {
                setFacultyList([]);
              }
            }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Head of Department (HOD)</Form.Label>
          {departmentToEdit ? (
            <Form.Select
              value={hod}
              onChange={(e) => setHod(e.target.value)}
              required
            >
              <option value="">Select HOD</option>
              {facultyList.length > 0 ? (
                facultyList.map((fac) => (
                  <option key={fac.faculty_id} value={fac.faculty_id}>
                    {fac.name}
                  </option>
                ))
              ) : (
                <option disabled>No faculty found</option>
              )}
            </Form.Select>
          ) : (
            <Form.Control
              type="text"
              placeholder="Enter HOD name"
              value={hod}
              onChange={(e) => setHod(e.target.value)}
              required
            />
          )}
        </Form.Group>

        <Button type="submit" variant="success" className="mt-2">
          {departmentToEdit ? "Update Department" : "Add Department"}
        </Button>
      </Form>
    </Card>
  );
};

export default DepartmentForm;
