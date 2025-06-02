import React, { useState, useEffect, useCallback } from "react";
import ResultForm from "../components/ResultForm";
import ResultList from "../components/ResultList";
import { getData } from "../services/api";
import { Container, Row, Col, Alert, Card } from "react-bootstrap";
import { useUser } from "../context/UserContext";

const Results = () => {
  const { currentUser } = useUser();
  const userRole = currentUser?.role;
  const userId = currentUser?.id;
  const studentId = currentUser?.studentId;

  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchResults = useCallback(async () => {
    try {
      const data = await getData("results");
      let filteredResults = data;

      if (userRole === "student") {
        filteredResults = data.filter(
          (r) => String(r.student?.student_id) === String(studentId)
        );
      }

      setResults(filteredResults);
      setError("");
    } catch (err) {
      console.error("Fetch failed", err);
      setError("❌ Failed to fetch results.");
    }
  }, [userRole, userId, studentId]);

  useEffect(() => {
    if (userRole && (userId || studentId)) {
      fetchResults();
    }
  }, [userRole, userId, studentId, fetchResults]);

  const handleResultAdded = () => {
    fetchResults();
    setSelectedResult(null);
    setSuccess("✅ Result saved successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleResultDeleted = () => {
    fetchResults();
    setSuccess("🗑️ Result deleted successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleEditResult = (result) => {
    setSelectedResult(result);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">📊 Manage Results</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        {(userRole === "admin" || userRole === "faculty") && (
          <Col md={4} className="mb-4">
            <Card className="p-3">
              {/* <h5 className="mb-3">{selectedResult ? "✏️ Edit Result" : "➕ Add Result"}</h5> */}
              <ResultForm
                selectedResult={selectedResult}
                setSelectedResult={setSelectedResult}
                fetchResults={handleResultAdded}
                currentUser={currentUser}
              />
            </Card>
          </Col>
        )}

        <Col md={userRole === "student" ? 12 : 8} className="mb-4">
          <Card className="p-3">
            {/* <h5 className="mb-3">📋 Results List</h5> */}
            <ResultList
              results={results}
              onEdit={handleEditResult}
              onDelete={handleResultDeleted}
              userRole={userRole}
              currentUser={currentUser}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Results;
