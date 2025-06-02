// src/pages/Faculty.js
import React, { useState } from "react";
import { Container, Row, Col, Alert, Card } from "react-bootstrap";
import FacultyForm from "../components/FacultyForm";
import FacultyList from "../components/FacultyList";
import { useUser } from "../context/UserContext";

const Faculty = () => {
  const { currentUser } = useUser();
  const [refresh, setRefresh] = useState(false);
  const [facultyToEdit, setFacultyToEdit] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isAdmin = currentUser?.role === "admin";

  const handleRefresh = (status, message) => {
    setRefresh(!refresh);
    setFacultyToEdit(null);

    if (status === "success") {
      setSuccess(message);
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    } else if (status === "error") {
      setError(message);
      setSuccess("");
    }
  };

  const handleEdit = (faculty) => {
    if (isAdmin) setFacultyToEdit(faculty);
  };

  if (currentUser?.role === "student") {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          ⛔ Access Denied: Students cannot access this page.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>👩‍🏫 Manage Faculty</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        {/* Show Form only for Admin */}
        {isAdmin && (
          <Col md={4}>
            <Card className="p-3">
              <FacultyForm
                facultyToEdit={facultyToEdit}
                onFacultyAdded={handleRefresh}
              />
            </Card>
          </Col>
        )}

        <Col md={isAdmin ? 8 : 12}>
          <Card className="p-3">
            <FacultyList key={refresh} onEdit={handleEdit} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Faculty;
