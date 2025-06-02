// components/CourseForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { getData, addData, updateData } from "../services/api";
import { useUser } from "../context/UserContext";

const CourseForm = ({ courseToEdit, onCourseSaved }) => {
  const [courseData, setCourseData] = useState({
    course_name: "",
    department: "",
  });
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const { currentUser } = useUser();

  const isEditing = !!courseToEdit;
  const isAdmin = currentUser?.role === "admin";
  const isFacultyEditing = currentUser?.role === "faculty" && isEditing;

  // ❗ Only show form if Admin OR Faculty editing
  const showForm = isAdmin || isFacultyEditing;

  useEffect(() => {
    // Always run this effect, but conditionally fetch or set data
    if (isAdmin) {
      fetchDepartments();
    }

    if (courseToEdit) {
      setCourseData({
        course_name: courseToEdit.course_name,
        department: courseToEdit.department,
      });
    } else {
      setCourseData({
        course_name: "",
        department: "",
      });
    }
  }, [courseToEdit, isAdmin]);

  const fetchDepartments = async () => {
    try {
      const data = await getData("departments");
      setDepartments(data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseData.course_name || !courseData.department) {
      setError("❗ All fields are required.");
      return;
    }

    try {
      if (isEditing) {
        await updateData("courses", courseToEdit.course_id, courseData);
      } else {
        await addData("courses", courseData);
      }
      setError("");
      onCourseSaved("success", "✅ Course saved successfully");
    } catch (err) {
      console.error("Error saving course:", err);
      setError("❌ Failed to save course.");
    }
  };

  if (!showForm) return null;

  return (
    <Card className="p-3">
      <h4>{isEditing ? "✏️ Edit Course" : "➕ Add Course"}</h4>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            name="course_name"
            value={courseData.course_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {isAdmin ? (
          <Form.Group className="mb-2">
            <Form.Label>Department</Form.Label>
            <Form.Select
              name="department"
              value={courseData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.department_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        ) : (
          <Form.Group className="mb-2">
            <Form.Label>Department</Form.Label>
            <Form.Control
              plaintext
              readOnly
              value={courseToEdit?.department_name || "N/A"}
            />
          </Form.Group>
        )}

        <Button type="submit" variant="success" className="mt-2">
          {isEditing ? "Update Course" : "Add Course"}
        </Button>
      </Form>
    </Card>
  );
};

export default CourseForm;
