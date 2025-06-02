// components/EnrollmentForm.js
import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { getData, addData, updateData } from "../services/api";
import { useUser } from "../context/UserContext";

const EnrollmentForm = ({ enrollmentToEdit, onSave, onCancel }) => {
  const { currentUser } = useUser();
  const [formData, setFormData] = useState({ student: "", course: "" });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [studentsData, coursesData] = await Promise.all([
          getData("students"),
          getData("courses"),
        ]);
        setStudents(studentsData);
        setCourses(coursesData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load students/courses:", err);
        setError("❌ Error loading form data.");
        setLoading(false);
      }
    };

    fetchDropdowns();

    if (enrollmentToEdit) {
      setFormData({
        student: enrollmentToEdit.student,
        course: enrollmentToEdit.course,
      });
    } else {
      setFormData({ student: "", course: "" });
    }
  }, [enrollmentToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.student || !formData.course) {
      setError("❗ All fields are required.");
      return;
    }

    try {
      if (enrollmentToEdit) {
        await updateData("enrollments", enrollmentToEdit.enrollment_id, formData);
        onSave(true, false);
      } else {
        await addData("enrollments", formData);
        onSave(true, true);
      }
      setError("");
    } catch (err) {
      console.error("Error saving enrollment:", err);
      setError("❌ Failed to save enrollment.");
      onSave(false);
    }
  };

  if (!currentUser || currentUser.role !== "admin") return null;

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        <p>Loading form data...</p>
      </div>
    );
  }

  return (
    <>
      <h4>{enrollmentToEdit ? "✏️ Edit Enrollment" : "➕ Add Enrollment"}</h4>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Student</Form.Label>
          <Form.Select
            name="student"
            value={formData.student}
            onChange={handleChange}
            required
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.student_id} value={s.student_id}>
                {s.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Course</Form.Label>
          <Form.Select name="course" value={formData.course} onChange={handleChange} required>
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="success" className="mt-2">
          {enrollmentToEdit ? "Update Enrollment" : "Add Enrollment"}
        </Button>{" "}
        {enrollmentToEdit && (
          <Button variant="secondary" onClick={onCancel} className="mt-2">
            Cancel
          </Button>
        )}
      </Form>
    </>
  );
};

export default EnrollmentForm;
