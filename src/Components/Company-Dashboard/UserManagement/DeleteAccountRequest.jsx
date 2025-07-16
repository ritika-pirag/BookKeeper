import React, { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

const DeleteAccountRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([
    { username: "Steven", requisitionDate: "25 Sep 2023", deleteRequestDate: "01 Oct 2023", status: null },
    { username: "Susan Lopez", requisitionDate: "30 Sep 2023", deleteRequestDate: "05 Oct 2023", status: null },
    { username: "Robert Grossman", requisitionDate: "10 Sep 2023", deleteRequestDate: "25 Sep 2023", status: null },
    { username: "Janet Hembre", requisitionDate: "15 Sep 2023", deleteRequestDate: "20 Sep 2023", status: null },
    { username: "Russell Belle", requisitionDate: "15 Aug 2023", deleteRequestDate: "01 Sep 2023", status: null },
    { username: "Henry Bryant", requisitionDate: "12 Aug 2023", deleteRequestDate: "01 Sep 2023", status: null },
    { username: "Michael Dawson", requisitionDate: "15 Sep 2023", deleteRequestDate: "01 Oct 2023", status: null },
  ]);

  const handleApprove = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].status = "approved";
    setUsers(updatedUsers);
  };

  const handleDisapprove = (index) => {
    setSelectedUser({ ...users[index], index });
    setShowModal(true);
  };

  const confirmDisapprove = () => {
    const updatedUsers = [...users];
    updatedUsers[selectedUser.index].status = "rejected";
    setUsers(updatedUsers);
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-3 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Delete Account Requests</h5>
        <div className="d-flex gap-2">
          <Button variant="outline-danger" title="Export PDF">
            <FaFilePdf />
          </Button>
          <Button variant="outline-success" title="Export Excel">
            <FaFileExcel />
          </Button>
        </div>
      </div>

      <Form.Group controlId="search" className="mb-3">
        <Form.Control type="text" placeholder="Search by user..." />
      </Form.Group>

      <div className="table-responsive">
        <Table bordered hover className="align-middle">
          <thead className="table-light text-center">
            <tr>
              <th><Form.Check type="checkbox" /></th>
              <th>User Name</th>
              <th>Requisition Date</th>
              <th>Delete Request Date</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td><Form.Check type="checkbox" /></td>
                <td className="d-flex align-items-center gap-2">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#dee2e6",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#495057",
                    }}
                  >IMG</div>
                  {user.username}
                </td>
                <td>{user.requisitionDate}</td>
                <td>{user.deleteRequestDate}</td>
                <td className="text-center">
                  {user.status === null ? (
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleApprove(index)}
                        style={{ borderRadius: '20px', padding: '4px 12px' }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDisapprove(index)}
                        style={{ borderRadius: '20px', padding: '4px 12px' }}
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      disabled
                      style={{
                        borderRadius: '20px',
                        padding: '4px 14px',
                        color: "#6c757d",
                        backgroundColor: "transparent",
                        border: "1px solid #ced4da",
                        cursor: "not-allowed"
                      }}
                    >
                      {user.status === "approved" ? "Approved" : "Rejected"}
                    </Button>
                  )}
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
          Are you sure you want to <strong className="text-danger">reject</strong> the delete
          request for <strong>{selectedUser?.username}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDisapprove}>Yes, Reject</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteAccountRequest;
