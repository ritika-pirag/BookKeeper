import React, { useState } from "react";
import { Table, Modal, Button, Form, Container } from "react-bootstrap";
import { Pagination } from "@mui/material";

const TaxPage = () => {
  const dummyTaxes = [
    { _id: "1", taxClass: "GST", taxValue: 18 },
    { _id: "2", taxClass: "VAT", taxValue: 12 },
    { _id: "3", taxClass: "Service Tax", taxValue: 15 },
    { _id: "4", taxClass: "Luxury Tax", taxValue: 25 },
    { _id: "5", taxClass: "Sales Tax", taxValue: 10 },
    { _id: "6", taxClass: "CGST", taxValue: 9 },
    { _id: "7", taxClass: "SGST", taxValue: 9 },
    { _id: "8", taxClass: "IGST", taxValue: 18 },
    { _id: "9", taxClass: "Excise Duty", taxValue: 5 },
    { _id: "10", taxClass: "Environmental Tax", taxValue: 2 },
    { _id: "11", taxClass: "Entry Tax", taxValue: 4 },
    { _id: "12", taxClass: "Education Cess", taxValue: 3 },
  ];

  const [taxes, setTaxes] = useState(dummyTaxes);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [taxClass, setTaxClass] = useState("");
  const [taxValue, setTaxValue] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const taxesPerPage = 5;
  const indexOfLastTax = currentPage * taxesPerPage;
  const indexOfFirstTax = indexOfLastTax - taxesPerPage;

  const filteredTaxes = taxes.filter((tax) =>
    tax.taxClass.toLowerCase().includes(search.toLowerCase())
  );
  const currentTaxes = filteredTaxes.slice(indexOfFirstTax, indexOfLastTax);
  const totalPages = Math.ceil(filteredTaxes.length / taxesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setTaxClass("");
    setTaxValue("");
    setEditId(null);
    setIsEditMode(false);
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newTax = {
      _id: editId || Date.now().toString(),
      taxClass,
      taxValue: parseFloat(taxValue),
    };

    if (isEditMode) {
      setTaxes((prev) =>
        prev.map((item) => (item._id === editId ? newTax : item))
      );
    } else {
      setTaxes((prev) => [...prev, newTax]);
    }

    handleModalClose();
  };

  const handleEdit = (tax) => {
    setTaxClass(tax.taxClass);
    setTaxValue(tax.taxValue);
    setEditId(tax._id);
    setIsEditMode(true);
    handleModalShow();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setTaxes((prev) => prev.filter((tax) => tax._id !== id));
    }
  };

  return (
    <Container className="mt-5">
      <div className="card p-4 shadow">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-semibold">Manage Taxes</h3>
          <Button
            className="text-white fw-semibold px-4 py-2"
            style={{ backgroundColor: "#06223a" }}
            onClick={handleModalShow}
          >
            <i className="fa-solid fa-plus" /> Add New Tax
          </Button>
        </div>

        <Form.Control
          type="text"
          placeholder="Search Taxes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3"
        />

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Tax Class</th>
              <th>Value (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTaxes.length > 0 ? (
              currentTaxes.map((tax, index) => (
                <tr key={tax._id}>
                  <td>{indexOfFirstTax + index + 1}</td>
                  <td>{tax.taxClass}</td>
                  <td>{tax.taxValue}%</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(tax)}
                      className="me-2"
                    >
                      <i className="fa-solid fa-pen" />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(tax._id)}
                    >
                      <i className="fa-solid fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No taxes found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className="d-flex justify-content-center mt-3">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Tax" : "Create New Tax"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Tax Class</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tax class"
                value={taxClass}
                onChange={(e) => setTaxClass(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Tax Value (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter value"
                value={taxValue}
                onChange={(e) => setTaxValue(e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
              <Button type="submit" variant="primary" className="ms-2">
                {isEditMode ? "Update" : "Submit"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TaxPage;
