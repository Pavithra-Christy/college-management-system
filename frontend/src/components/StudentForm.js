// components/StudentForm.js
import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { addData, updateData, getData } from "../services/api";

const StudentForm = ({ studentToEdit, onStudentAdded }) => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    phone: "",
    department_id: "",
  });
  const [departments, setDepartments] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getData("departments");
        setDepartments(data);
      } catch (err) {
        console.error("Failed to load departments", err);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (studentToEdit) {
      setStudent({
        name: studentToEdit.name || "",
        email: studentToEdit.email || "",
        dob: studentToEdit.dob || "",
        gender: studentToEdit.gender || "",
        phone: studentToEdit.phone || "",
        department_id:
          studentToEdit.department_id?.department_id ||
          studentToEdit.department_id ||
          "",
      });
    } else {
      setStudent({
        name: "",
        email: "",
        dob: "",
        gender: "",
        phone: "",
        department_id: "",
      });
    }
    setSuccess("");
    setError("");
  }, [studentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (
      !student.name ||
      !student.email ||
      !student.dob ||
      !student.gender ||
      !student.phone ||
      !student.department_id
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      if (studentToEdit) {
        await updateData("students", studentToEdit.student_id, student);
        setSuccess("✅ Student updated successfully!");
      } else {
        await addData("students", student);
        setSuccess("✅ Student added successfully!");
      }
      onStudentAdded();
      setStudent({
        name: "",
        email: "",
        dob: "",
        gender: "",
        phone: "",
        department_id: "",
      });
    } catch (err) {
      setError("❌ Failed to save student.");
    }
  };

  return (
    <Card className="p-3">
      <h4>{studentToEdit ? "✏️ Edit Student" : "➕ Add Student"}</h4>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-2">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="dob" className="mb-2">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dob"
            value={student.dob}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="gender" className="mb-2">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            name="gender"
            value={student.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="phone" className="mb-2">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={student.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="department_id" className="mb-2">
          <Form.Label>Department</Form.Label>
          <Form.Select
            name="department_id"
            value={student.department_id}
            onChange={handleChange}
            required
          >
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.department_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="success" className="mt-2">
          {studentToEdit ? "Update Student" : "Add Student"}
        </Button>
      </Form>
    </Card>
  );
};

export default StudentForm;
