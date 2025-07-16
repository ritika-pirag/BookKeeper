import React, { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { FaFilePdf, FaFileExcel, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const DeleteAccountRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const data = [
    { username: "Steven", requisitionDate: "25 Sep 2023", deleteRequestDate: "01 Oct 2023" },
    { username: "Susan Lopez", requisitionDate: "30 Sep 2023", deleteRequestDate: "05 Oct 2023" },
    { username: "Robert Grossman", requisitionDate: "10 Sep 2023", deleteRequestDate: "25 Sep 2023" },
    { username: "Janet Hembre", requisitionDate: "15 Sep 2023", deleteRequestDate: "20 Sep 2023" },
    { username: "Russell Belle", requisitionDate: "15 Aug 2023", deleteRequestDate: "01 Sep 2023" },
    { username: "Henry Bryant", requisitionDate: "12 Aug 2023", deleteRequestDate: "01 Sep 2023" },
    { username: "Michael Dawson", requisitionDate: "15 Sep 2023", deleteRequestDate: "01 Oct 2023" },
  ];

  const [users, setUsers] = useState(data);

  const handleApprove = (user) => {
    alert(`Approved deletion request for ${user.username}`);
    // Optional: remove or update state
  };

  const handleDisapprove = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmDisapprove = () => {
    alert(`Disapproved deletion request for ${selectedUser.username}`);
    setShowModal(false);
    setSelectedUser(null);
    // Optional: remove or update state
  };

  return (
    <div className="p-2 mt-4">
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
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
                  <div className="d-flex gap-2">
                    <Button variant="success" size="sm" onClick={() => handleApprove(user)}>
                      <FaThumbsUp className="me-1" /> Approve
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDisapprove(user)}>
                      <FaThumbsDown className="me-1" /> Disapprove
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Disapprove Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Disapproval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to <strong>disapprove</strong> the delete request for{" "}
          <strong>{selectedUser?.username}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDisapprove}>
            Yes, Disapprove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteAccountRequest;
