// components/StudentList.js
import React from "react";
import { Table, Button } from "react-bootstrap";
import { deleteData } from "../services/api";

const StudentList = ({ students, onEdit, refreshStudents }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await deleteData("students", id);
      refreshStudents();
    } catch (err) {
      console.error("Failed to delete student:", err);
    }
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length > 0 ? (
          students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.dob}</td>
              <td>{student.gender}</td>
              <td>{student.phone}</td>
              <td>{student.department_name || student.department_id?.name}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => onEdit(student)}
                >
                  ✏️ Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(student.student_id)}
                >
                  🗑 Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">
              No students found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default StudentList;
