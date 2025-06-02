// components/CourseList.js
import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, Alert, Spinner } from "react-bootstrap";
import { getData, deleteData } from "../services/api";
import { useUser } from "../context/UserContext";

const CourseList = ({ onEdit }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUser();
  const role = currentUser?.role;

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getData("courses");
      setCourses(data); // backend filtering
    } catch {
      setError("❌ Failed to fetch courses.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteData("courses", id);
      setSuccess("✅ Course deleted successfully!");
      fetchCourses();
    } catch {
      setError("❌ Failed to delete course.");
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p>Loading courses...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Department</th>
              {role !== "student" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.course_id}>
                  <td>{course.course_id}</td>
                  <td>{course.course_name}</td>
                  <td>{course.department_name || "—"}</td>
                  {role !== "student" && (
                    <td>
                      {(role === "admin" || course.is_faculty_owner) && (
                        <>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => onEdit(course)}
                          >
                            ✏️ Edit
                          </Button>
                          {role === "admin" && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(course.course_id)}
                            >
                              🗑 Delete
                            </Button>
                          )}
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default CourseList;
