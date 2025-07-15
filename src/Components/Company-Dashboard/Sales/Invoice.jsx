import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { FaTrash, FaDownload, FaFileAlt } from "react-icons/fa";

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

const InvoiceTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

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
    <Container className="py-1">
      <h4 className="mb-3">Invoices</h4>
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
        <Table bordered hover className="bg-white shadow-sm">
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
                  <div className="d-flex gap-2 flex-wrap">
                    <Button variant="outline-secondary" size="sm">
                      <FaFileAlt />
                    </Button>
                    <Button variant="info" size="sm" onClick={() => handleDownload(invoice)}>
                      <FaDownload />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(invoice)}>
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

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
    </Container>
  );
};

export default InvoiceTable;
