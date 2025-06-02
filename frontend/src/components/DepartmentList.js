// src/components/DepartmentList.js
import React, { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { deleteDepartment, fetchFaculty } from "../services/api";

const DepartmentList = ({ departments, onEdit, onDeleteSuccess }) => {
  const [error, setError] = useState("");
  const [facultyMap, setFacultyMap] = useState({});

  useEffect(() => {
    loadFacultyList();
  }, []);

  const loadFacultyList = async () => {
    try {
      const facultyList = await fetchFaculty();
      if (facultyList && facultyList.length > 0) {
        const mapping = {};
        facultyList.forEach((fac) => {
          mapping[fac.id] = fac.name;
        });
        setFacultyMap(mapping);
        setError(""); // clear error if successful
      } else {
        setError("⚠️ No faculty records found.");
      }
    } catch (err) {
      console.error("Faculty Fetch Error:", err);
      setError("❌ Failed to fetch faculty list.");
    }
  };

  const handleDelete = async (departmentId) => {
    const userRole = (localStorage.getItem("role") || "").toLowerCase();
    if (userRole !== "admin") {
      setError("Unauthorized access");
      return;
    }

    try {
      await deleteDepartment(departmentId);
      setError("");
      onDeleteSuccess();
    } catch (err) {
      console.error("Delete Error:", err);
      setError("❌ Failed to delete department.");
    }
  };

  const getHodName = (hod) => {
    if (!hod) return "—";
    if (facultyMap[hod]) return facultyMap[hod]; // if it's an ID
    return hod; // fallback if it's already a name
  };

  return (
    <>
      {/* <h4>📋 Department List</h4> */}
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>HOD</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No departments found.</td>
            </tr>
          ) : (
            departments.map((dept, index) => (
              <tr key={dept.department_id}>
                <td>{index + 1}</td>
                <td>{dept.department_name}</td>
                <td>{getHodName(dept.hod)}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => onEdit(dept)}
                    className="me-2"
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(dept.department_id)}
                  >
                    🗑️ Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};

export default DepartmentList;
