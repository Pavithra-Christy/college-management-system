// src/pages/Students.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Card } from "react-bootstrap";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import { getData } from "../services/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getData("students");
      setStudents(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to fetch students.");
    }
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  const handleStudentAdded = () => {
    fetchStudents();
    setShowForm(false);
    setSuccess("✅ Student saved successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <Container className="mt-4">
      <h2>🎓 Manage Students</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        {showForm && (
          <Col md={4}>
            <Card className="p-3 mb-4">
              <StudentForm
                studentToEdit={selectedStudent}
                onStudentAdded={handleStudentAdded}
              />
            </Card>
          </Col>
        )}
        <Col md={showForm ? 8 : 12}>
          <Card className="p-3 mb-4">
            <StudentList
              students={students}
              onEdit={handleEditStudent}
              refreshStudents={fetchStudents}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Students;
