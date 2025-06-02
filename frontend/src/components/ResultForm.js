import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { addResult, updateResult, getData } from "../services/api";

const ResultForm = ({
  fetchResults,
  selectedResult,
  setSelectedResult,
  currentUser,
}) => {
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [exam, setExam] = useState("");
  const [student, setStudent] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchFormData();
  }, []);

  useEffect(() => {
    if (selectedResult) {
      setMarks(selectedResult.obtained_marks);
      setGrade(selectedResult.grade);
      setExam(selectedResult.exam.exam_id);
      setStudent(selectedResult.student.student_id);
    }
  }, [selectedResult]);

  const fetchFormData = async () => {
    const examData = await getData("exams");
    setExams(examData);

    if (currentUser?.role === "faculty") {
      const resultData = await getData("results");
      const uniqueStudents = [];
      const studentIds = new Set();

      resultData.forEach((r) => {
        const s = r.student;
        if (s && !studentIds.has(s.student_id)) {
          studentIds.add(s.student_id);
          uniqueStudents.push(s);
        }
      });

      setStudents(uniqueStudents);
    } else {
      const studentData = await getData("students");
      setStudents(studentData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultData = {
      obtained_marks: marks,
      grade,
      exam,
      student,
    };

    try {
      if (selectedResult) {
        await updateResult("results", selectedResult.result_id, resultData);
        setMessage("✅ Result updated successfully.");
      } else {
        await addResult("results", resultData);
        setMessage("✅ Result created successfully.");
      }

      setMarks("");
      setGrade("");
      setExam("");
      setStudent("");
      setSelectedResult(null);
      fetchResults();
    } catch (error) {
      console.error("Error submitting result:", error);
      setMessage("❌ Error submitting result.");
    }
  };

  return (
    <Card className="p-3">
      <h4>{selectedResult ? "✏️ Edit Result" : "➕ Add Result"}</h4>
      {message && <Alert variant="info">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Exam</Form.Label>
          <Form.Select
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            required
          >
            <option value="">Select Exam</option>
            {exams.map((exam) => (
              <option key={exam.exam_id} value={exam.exam_id}>
                {exam.course_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Student</Form.Label>
          <Form.Select
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.student_id} value={student.student_id}>
                {student.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Marks</Form.Label>
          <Form.Control
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Grade</Form.Label>
          <Form.Control
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="mt-2">
          {selectedResult ? "Update Result" : "Add Result"}
        </Button>
      </Form>
    </Card>
  );
};

export default ResultForm;
