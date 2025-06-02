import React, { useState, useEffect } from "react";
import { Table, Button, Alert, Spinner } from "react-bootstrap";
import { getData, deleteData } from "../services/api";
import { useUser } from "../context/UserContext";

const ExamList = ({ exams, onEdit, refreshExams }) => {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const fetchCourses = async () => {
    try {
      const data = await getData("courses");
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  const getCourseName = (id) => {
    const course = courses.find((c) => c.course_id === id);
    return course ? `${course.course_name} (${course.course_id})` : `Course #${id}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;

    try {
      await deleteData("exams", id);
      setSuccess("✅ Exam deleted successfully!");
      refreshExams();
    } catch {
      setError("❌ Failed to delete exam.");
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p>Loading exams...</p>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course</th>
              <th>Exam Date</th>
              <th>Total Marks</th>
              <th>Passing Marks</th>
              {user?.role !== "student" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {exams.length > 0 ? (
              exams.map((exam) => (
                <tr key={exam.exam_id}>
                  <td>{exam.exam_id}</td>
                  <td>{getCourseName(exam.course)}</td>
                  <td>{exam.exam_date}</td>
                  <td>{exam.total_marks}</td>
                  <td>{exam.passing_marks}</td>
                  {user?.role !== "student" && (
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => onEdit(exam)}
                      >
                        ✏️ Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(exam.exam_id)}
                      >
                        🗑 Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={user?.role !== "student" ? 6 : 5} className="text-center">
                  No exams found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ExamList;
