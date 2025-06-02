import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { getData } from "../services/api";
import { useUser } from "../context/UserContext";

const AdminDashboard = () => {
  const { currentUser } = useUser();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [students, courses, exams] = await Promise.all([
          getData("students"),
          getData("courses"),
          getData("exams"),
        ]);
        setStats({
          students: students.length,
          courses: courses.length,
          exams: exams.length,
        });
      } catch (err) {
        console.error("Error loading stats", err);
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) return <Spinner animation="border" className="m-3" />;

  return (
    <div>
      <h3>Welcome, {currentUser?.name || "Admin"}!</h3>
      <Row className="mt-3">
        <Col md={4}><Card body>Total Students: {stats.students}</Card></Col>
        <Col md={4}><Card body>Total Courses: {stats.courses}</Card></Col>
        <Col md={4}><Card body>Total Exams: {stats.exams}</Card></Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
