// pages/Enrollments.js
import React, { useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import EnrollmentForm from "../components/EnrollmentForm";
import EnrollmentList from "../components/EnrollmentList";
import { useUser } from "../context/UserContext";

const Enrollments = () => {
  const { currentUser } = useUser();
  const userRole = currentUser?.role?.toLowerCase();
  const userId =
    userRole === "faculty"
      ? currentUser?.facultyId
      : userRole === "student"
      ? currentUser?.studentId
      : currentUser?.id;

  const [refresh, setRefresh] = useState(false);
  const [enrollmentToEdit, setEnrollmentToEdit] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRefresh = (status, added = false) => {
    setRefresh(!refresh);
    setEnrollmentToEdit(null);
    if (!status) return;

    if (status === "success") {
      setSuccess(
        added
          ? "✅ Enrollment added successfully!"
          : "✅ Enrollment updated successfully!"
      );
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError("❌ Failed to process enrollment.");
      setSuccess("");
    }
  };

  const handleEdit = (enrollment) => {
    setEnrollmentToEdit(enrollment);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setEnrollmentToEdit(null);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">📚 Manage Enrollments</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        {userRole === "admin" && (
          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <EnrollmentForm
                enrollmentToEdit={enrollmentToEdit}
                onSave={(status, added) =>
                  handleRefresh(status ? "success" : "error", added)
                }
                onCancel={handleCancel}
              />
            </Card>
          </Col>
        )}

        <Col md={userRole === "admin" ? 8 : 12}>
          <Card className="p-3 shadow-sm">
            <EnrollmentList
              key={refresh}
              userRole={userRole}
              userId={userId}
              onEdit={userRole === "faculty" ? null : handleEdit}
              onDelete={userRole === "faculty" ? null : () => handleRefresh("success")}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Enrollments;
