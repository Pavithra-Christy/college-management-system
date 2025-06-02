// components/EnrollmentList.js
import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, Alert, Spinner } from "react-bootstrap";
import { getData, deleteData } from "../services/api";
import { useUser } from "../context/UserContext";

const EnrollmentList = ({ onEdit, onDelete, userRole, userId }) => {
  const { currentUser } = useUser();
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAllData = useCallback(async () => {
    if (!currentUser) return;

    const { role, studentId } = currentUser;
    setLoading(true);

    try {
      const [enrollmentData, studentData, courseData] = await Promise.all([
        getData("enrollments"),
        getData("students"),
        getData("courses"),
      ]);

      

      let filtered = enrollmentData;

      if (role === "faculty") {
        const facultyCourses = courseData
        .filter((course) => course.is_faculty_owner)
        .map((c) => c.course_id);


        filtered = enrollmentData.filter((e) =>
          facultyCourses.includes(e.course)
        );
      }

      if (role === "student") {
        filtered = enrollmentData.filter((e) => e.student === studentId);
      }

      setEnrollments(filtered);
      setStudents(studentData);
      setCourses(courseData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("❌ Failed to load data.");
    }

    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) return;

    try {
      await deleteData("enrollments", id);
      setSuccess("✅ Enrollment deleted successfully.");
      fetchAllData();
      onDelete(); // Trigger parent refresh
    } catch {
      setError("❌ Failed to delete enrollment.");
    }
  };

  const getStudentName = (id) => {
    const student = students.find((s) => s.student_id === id);
    return student ? student.name : `Student #${id}`;
  };

  const getCourseName = (id) => {
    const course = courses.find((c) => c.course_id === id);
    return course ? course.course_name : `Course #${id}`;
  };

  if (!currentUser) return null;

  const showActions = userRole === "admin";

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p>Loading enrollments...</p>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Course</th>
              {showActions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {enrollments.length > 0 ? (
              enrollments.map((enroll) => (
                <tr key={enroll.enrollment_id}>
                  <td>{enroll.enrollment_id}</td>
                  <td>{getStudentName(enroll.student)}</td>
                  <td>{getCourseName(enroll.course)}</td>
                  {showActions && (
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => onEdit(enroll)}
                      >
                        ✏️ Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(enroll.enrollment_id)}
                      >
                        🗑 Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={showActions ? 4 : 3} className="text-center">
                  No enrollments found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default EnrollmentList;
