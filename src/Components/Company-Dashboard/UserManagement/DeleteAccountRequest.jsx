import React, { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { FaTrash, FaFilePdf, FaFileExcel } from "react-icons/fa";

const DeleteAccountRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const data = [
    {
      username: "Steven",
      requisitionDate: "25 Sep 2023",
      deleteRequestDate: "01 Oct 2023",
    },
    {
      username: "Susan Lopez",
      requisitionDate: "30 Sep 2023",
      deleteRequestDate: "05 Oct 2023",
    },
    {
      username: "Robert Grossman",
      requisitionDate: "10 Sep 2023",
      deleteRequestDate: "25 Sep 2023",
    },
    {
      username: "Janet Hembre",
      requisitionDate: "15 Sep 2023",
      deleteRequestDate: "20 Sep 2023",
    },
    {
      username: "Russell Belle",
      requisitionDate: "15 Aug 2023",
      deleteRequestDate: "01 Sep 2023",
    },
    {
      username: "Henry Bryant",
      requisitionDate: "12 Aug 2023",
      deleteRequestDate: "01 Sep 2023",
    },
    {
      username: "Michael Dawson",
      requisitionDate: "15 Sep 2023",
      deleteRequestDate: "01 Oct 2023",
    },
  ];

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting user:", selectedUser.username);
    setShowModal(false);
    setSelectedUser(null);
    // Implement actual delete logic here
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Delete Account Request</h5>
        <div className="d-flex gap-2">
          <Button variant="danger">
            <FaFilePdf />
          </Button>
          <Button variant="success">
            <FaFileExcel />
          </Button>
        </div>
      </div>

      <Form.Group controlId="search" className="mb-3">
        <Form.Control type="text" placeholder="Search" />
      </Form.Group>

      <div className="table-responsive">
        <Table bordered hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>
                <Form.Check type="checkbox" />
              </th>
              <th>User Name</th>
              <th>Requisition Date</th>
              <th>Delete Request Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td className="d-flex align-items-center gap-2">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#ccc",
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                    }}
                  >
                    IMG
                  </div>
                  {user.username}
                </td>
                <td>{user.requisitionDate}</td>
                <td>{user.deleteRequestDate}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleDeleteClick(user)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedUser?.username}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteAccountRequest;
