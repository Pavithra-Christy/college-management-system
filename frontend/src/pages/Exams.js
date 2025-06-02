import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import ExamForm from "../components/ExamForm";
import ExamList from "../components/ExamList";
import { getData } from "../services/api";
import { useUser } from "../context/UserContext";

const Exams = () => {
  const { currentUser: user } = useUser();  // ✅ Corrected line
  const [selectedExam, setSelectedExam] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [exams, setExams] = useState([]);

  const fetchExams = useCallback(async () => {
    try {
      const allExams = await getData("exams");
      setExams(allExams);
      setError("");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to fetch exams.");
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchExams();
    }
  }, [user, fetchExams]);

  const handleEditExam = (exam) => {
    setSelectedExam(exam);
    setSuccess("");
    setError("");
  };

  const handleExamAdded = () => {
    fetchExams();
    setSelectedExam(null);
    setSuccess("✅ Exam saved successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  if (!user) return null;

  return (
    <Container className="mt-4">
      <h2>📝 Manage Exams</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        {user.role !== "student" && (
          <Col md={4}>
            <ExamForm
              examToEdit={selectedExam}
              onExamAdded={handleExamAdded}
              role={user.role}
              facultyId={user.id}
            />
          </Col>
        )}

        <Col md={user.role !== "student" ? 8 : 12}>
          <Card className="p-3">
            <ExamList
              exams={exams}
              onEdit={handleEditExam}
              refreshExams={fetchExams}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Exams;
