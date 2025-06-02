import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { getData } from "../services/api";
import { useUser } from "../context/UserContext";

const FacultyDashboard = () => {
  const { currentUser } = useUser();
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allCourses, allExams] = await Promise.all([
          getData("courses"),
          getData("exams"),
        ]);

        const myCourses = allCourses.filter(c => c.is_faculty_owner);
        const myExams = allExams.filter(e => e.faculty === currentUser.facultyId);

        setCourses(myCourses);
        setExams(myExams);
      } catch (err) {
        console.error("Faculty dashboard error", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [currentUser]);

  if (loading) return <Spinner animation="border" className="m-3" />;

  return (
    <div>
      <h3>Welcome, {currentUser?.name || "Faculty"}!</h3>
      <Row className="mt-3">
        <Col md={6}><Card body>Courses Teaching: {courses.length}</Card></Col>
        <Col md={6}><Card body>Exams Created: {exams.length}</Card></Col>
      </Row>
    </div>
  );
};

export default FacultyDashboard;
