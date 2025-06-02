import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { getData } from "../services/api";
import { useUser } from "../context/UserContext";

const StudentDashboard = () => {
  const { currentUser } = useUser();
  const [enrollments, setEnrollments] = useState([]);
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allEnrollments, allExams, allResults] = await Promise.all([
          getData("enrollments"),
          getData("exams"),
          getData("results"),
        ]);

        const myEnrollments = allEnrollments.filter(e => e.student === currentUser.studentId);
        const myExams = allExams.filter(e => e.student === currentUser.studentId);
        const myResults = allResults.filter(r => r.student === currentUser.studentId);

        setEnrollments(myEnrollments);
        setExams(myExams);
        setResults(myResults);
      } catch (err) {
        console.error("Student dashboard error", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [currentUser]);

  if (loading) return <Spinner animation="border" className="m-3" />;

  return (
    <div>
      <h3>Welcome, {currentUser?.name || "Student"}!</h3>
      <Row className="mt-3">
        <Col md={4}><Card body>Courses Enrolled: {enrollments.length}</Card></Col>
        <Col md={4}><Card body>Upcoming Exams: {exams.length}</Card></Col>
        <Col md={4}><Card body>Grades Available: {results.length}</Card></Col>
      </Row>
    </div>
  );
};

export default StudentDashboard;
