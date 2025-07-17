import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Container,
  Row,
  Col,
  Form,
  Card,
} from "react-bootstrap";
import { FaTrash, FaDownload, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // navigation

const invoices = [
  { id: 1083, customer: "Shawn Hoowod", date: "15-07-2025", amount: 0.0, status: "Due" },
  { id: 1082, customer: "Shawn Hoowod", date: "15-07-2025", amount: 0.0, status: "Due" },
  { id: 1081, customer: "Elijah Allan", date: "15-07-2025", amount: 890.0, status: "Paid" },
  { id: 1080, customer: "Jere Swayne", date: "15-07-2025", amount: 2085.12, status: "Partial" },
  { id: 1075, customer: "Prince Stamper", date: "12-07-2025", amount: 91.27, status: "Due" },
];

const getStatusVariant = (status) => {
  switch (status) {
    case "Paid":
      return "success";
    case "Due":
      return "danger";
    case "Partial":
      return "primary";
    default:
      return "secondary";
  }
};

const Invoice = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const navigate = useNavigate(); // 🔁 navigation setup

  const handleDelete = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const confirmDelete = () => {
    alert(`Deleted invoice #${selectedInvoice.id}`);
    setShowModal(false);
  };

  const handleDownload = (invoice) => {
    const blob = new Blob([`Invoice PDF for ${invoice.customer}`], {
      type: "application/pdf",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice_${invoice.id}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div  className="p-4 mt-2">
      <Row className="g-4 ">
        <Col md={12}>
          <Card className=" rounded-3 p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-semibold mb-0">Invoices</h6>
              <a href="#" className="text-decoration-none small text-primary">View All</a>
            </div>

            <Row className="mb-3 align-items-center">
              <Col md={6} sm={12}>
                <Form.Group controlId="entriesPerPage" className="d-flex align-items-center">
                  <Form.Label className="me-2 mb-0">Show</Form.Label>
                  <Form.Select
                    size="sm"
                    style={{ width: "80px", marginRight: "10px" }}
                    defaultValue="10"
                  >
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </Form.Select>
                  <span className="mb-0">entries</span>
                </Form.Group>
              </Col>
              <Col md={6} sm={12} className="text-md-end mt-2 mt-md-0">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  style={{ maxWidth: "200px", display: "inline-block" }}
                />
              </Col>
            </Row>

            <div className="table-responsive">
              <Table bordered hover className="mt-3 mb-0">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Settings</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr key={invoice.id}>
                      <td>{index + 1}</td>
                      <td>{invoice.id}</td>
                      <td>{invoice.customer}</td>
                      <td>{invoice.date}</td>
                      <td>${invoice.amount.toFixed(2)}</td>
                      <td>
                        <span className={`badge bg-${getStatusVariant(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn outline-info btn-sm py-1 px-1 text-info"
                            size="sm"
                            onClick={() => navigate("/company/viewinvoicee")} // 🔁 navigate to view
                          >
                            <FaEye size={16}/>
                          </button>
                          <button className="btn outline-primary btn-sm text-warning py-1 px-1" size="sm" onClick={() => handleDownload(invoice)}>
                            <FaDownload size={16}/>
                          </button>
                          <button className="btn outline-primary btn-sm text-danger py-2 px-1" size="sm" onClick={() => handleDelete(invoice)}>
                            <FaTrash size={16}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3 px-3">
              <span className="small text-muted">
                Showing 1 to {invoices.length} of {invoices.length} results
              </span>

              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <button className="page-link rounded-start">&laquo;</button>
                  </li>
                  <li className="page-item active">
                    <button
                      className="page-link"
                      style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}
                    >
                      1
                    </button>
                  </li>
                  <li className="page-item">
                    <button className="page-link">2</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link rounded-end">&raquo;</button>
                  </li>
                </ul>
              </nav>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Delete Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete invoice #{selectedInvoice?.id}?
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

export default Invoice;
