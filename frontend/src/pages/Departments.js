// src/pages/Departments.js
import React, { useState, useEffect } from "react";
import DepartmentForm from "../components/DepartmentForm";
import DepartmentList from "../components/DepartmentList";
import { fetchDepartments as fetchDepartmentsFromAPI } from "../services/api";
import { Container, Row, Col, Alert, Card } from "react-bootstrap";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(true);

  const loadDepartments = async () => {
    try {
      const data = await fetchDepartmentsFromAPI();
      setDepartments(data);
      setError("");
    } catch (err) {
      setError("❌ Failed to fetch departments.");
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleEditDepartment = (department) => {
    setSelectedDepartment(department);
    setShowForm(true);
  };

  const handleDepartmentAdded = () => {
    loadDepartments();
    setShowForm(false);
    setSuccess("✅ Department updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <Container className="mt-4">
      <h2>🏛 Manage Departments</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        {showForm && (
          <Col md={4}>
            <Card className="p-3 mb-4">
              <DepartmentForm
                departmentToEdit={selectedDepartment}
                onDepartmentAdded={handleDepartmentAdded}
              />
            </Card>
          </Col>
        )}
        <Col md={showForm ? 8 : 12}>
          <Card className="p-3 mb-4">
            <DepartmentList
              departments={departments}
              onEdit={handleEditDepartment}
              onDeleteSuccess={loadDepartments}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Departments;
