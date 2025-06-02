// pages/Courses.js
import React, { useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";
import { useUser } from "../context/UserContext";

const Courses = () => {
  const [refresh, setRefresh] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { currentUser } = useUser();

  const handleRefresh = (status, message) => {
    setRefresh(!refresh);
    setCourseToEdit(null);
    if (status === "success") {
      setSuccess(message);
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    } else if (status === "error") {
      setError(message);
      setSuccess("");
    }
  };

  const handleEdit = (course) => {
    setCourseToEdit(course);
    setSuccess("");
    setError("");
  };

  const showForm =
    currentUser?.role === "admin" ||
    (currentUser?.role === "faculty" && courseToEdit);

  return (
    <Container className="mt-4">
      <h2>📚 Manage Courses</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        {showForm && (
          <Col md={4}>
            <Card className="p-3">
              <CourseForm
                courseToEdit={courseToEdit}
                onCourseSaved={handleRefresh}
              />
            </Card>
          </Col>
        )}

        <Col md={showForm ? 8 : 12}>
          <Card className="p-3">
            <CourseList key={refresh} onEdit={handleEdit} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Courses;
