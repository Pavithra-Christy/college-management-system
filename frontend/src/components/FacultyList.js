// src/components/FacultyList.js
import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, Alert, Spinner } from "react-bootstrap";
import { fetchFaculty, deleteFaculty } from "../services/api";
import { useUser } from "../context/UserContext";

const FacultyList = ({ onEdit }) => {
  const { currentUser } = useUser();
  const [facultyList, setFacultyList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  // const isAdmin = currentUser?.role === "admin";
  const isFaculty = currentUser?.role === "faculty";

  const canEditOrDelete = () => currentUser?.role === "admin";

  const loadFaculty = useCallback(async () => {
    try {
      const res = await fetchFaculty();
      let data = res;

      if (isFaculty) {
        data = res.filter(
          (f) => f.faculty_id.toString() === currentUser.facultyId.toString()
        );
      }

      setFacultyList(data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch faculty:", err);
      setError("❌ Failed to load faculty.");
    } finally {
      setLoading(false);
    }
  }, [currentUser, isFaculty]);

  useEffect(() => {
    loadFaculty();
  }, [loadFaculty]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this faculty?")) return;
    try {
      await deleteFaculty(id);
      setSuccess("✅ Faculty deleted successfully!");
      loadFaculty();
    } catch (err) {
      console.error("Failed to delete faculty:", err);
      setError("❌ Failed to delete faculty.");
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading faculty...</p>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              {canEditOrDelete() && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {facultyList.length > 0 ? (
              facultyList.map((faculty) => (
                <tr key={faculty.faculty_id}>
                  <td>{faculty.faculty_id}</td>
                  <td>{faculty.name}</td>
                  <td>{faculty.email}</td>
                  <td>{faculty.department?.department_name}</td>
                  {canEditOrDelete() && (
                    <td>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => onEdit(faculty)}
                      >
                        ✏️ Edit
                      </Button>{" "}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(faculty.faculty_id)}
                      >
                        🗑 Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={canEditOrDelete() ? 5 : 4} className="text-center">
                  No faculty found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default FacultyList;
