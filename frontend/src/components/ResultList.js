import React from "react";
import { Table, Button } from "react-bootstrap";
import { deleteData } from "../services/api";
import { useUser } from "../context/UserContext";

const ResultList = ({ results, onEdit, onDelete, userRole }) => {
  const { currentUser } = useUser();

  const canEditOrDelete = () => userRole === "admin" || userRole === "faculty";

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this result?")) {
      await deleteData("results", id);
      onDelete();
    }
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Exam</th>
          <th>Student</th>
          <th>Marks</th>
          <th>Grade</th>
          {canEditOrDelete() && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <tr key={result.result_id}>
            <td>{result.exam?.course_name || result.exam?.name}</td>
            <td>{result.student?.name}</td>
            <td>{result.obtained_marks}</td>
            <td>{result.grade}</td>
            {canEditOrDelete() && (
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(result)}
                >
                  ✏️ Edit
                </Button>
                {userRole === "admin" && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(result.result_id)}
                  >
                    🗑️ Delete
                  </Button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ResultList;
