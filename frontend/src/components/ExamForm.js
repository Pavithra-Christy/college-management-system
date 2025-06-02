import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { scheduleExam, updateExam, getData } from "../services/api";

const ExamForm = ({ examToEdit, onExamAdded, role }) => {
  const [examData, setExamData] = useState({
    course: "",
    exam_date: "",
    total_marks: "",
    passing_marks: "",
  });

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const fetchCourses = useCallback(async () => {
    try {
      if (role === "faculty") {
        const facultyCourses = await getData("faculty-courses");
        setCourses(facultyCourses); // Already filtered by backend
      } else {
        const allCourses = await getData("courses");
        setCourses(allCourses);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  }, [role]);

  useEffect(() => {
    fetchCourses();
    if (examToEdit) {
      setExamData({
        course: examToEdit.course,
        exam_date: examToEdit.exam_date,
        total_marks: examToEdit.total_marks,
        passing_marks: examToEdit.passing_marks,
      });
    }
  }, [examToEdit, fetchCourses]);

  const handleChange = (e) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!examData.course || !examData.exam_date || !examData.total_marks || !examData.passing_marks) {
      setError("❗ All fields are required.");
      return;
    }

    try {
      if (examToEdit) {
        await updateExam(examToEdit.exam_id, examData);
      } else {
        await scheduleExam(examData);
      }
      setError("");
      onExamAdded();
    } catch (err) {
      console.error("Error saving exam:", err);
      setError("❌ Failed to save exam.");
    }
  };

  return (
    <Card className="p-3">
      <h4>{examToEdit ? "✏️ Edit Exam" : "🗓️ Schedule Exam"}</h4>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Course</Form.Label>
          <Form.Select
            name="course"
            value={examData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.course_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Exam Date</Form.Label>
          <Form.Control
            type="date"
            name="exam_date"
            value={examData.exam_date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Total Marks</Form.Label>
          <Form.Control
            type="number"
            name="total_marks"
            value={examData.total_marks}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Passing Marks</Form.Label>
          <Form.Control
            type="number"
            name="passing_marks"
            value={examData.passing_marks}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="success" className="mt-2">
          {examToEdit ? "Update Exam" : "Schedule Exam"}
        </Button>
      </Form>
    </Card>
  );
};

export default ExamForm;
