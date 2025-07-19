import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTaxes,
  createTax,
  updateTax,
  deleteTax
} from "../../../../redux/slices/taxSlice";
import Swal from "sweetalert2";
import { Pagination } from "@mui/material";

const TaxPage = () => {
  const dispatch = useDispatch();
  const { taxes, loading } = useSelector((state) => state.tax);

  const [taxId, setTaxId] = useState("");
  const [taxClass, setTaxClass] = useState("");
  const [taxValue, setTaxValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const taxesPerPage = 10;

  // Filtered list
  const filteredTaxes = taxes.filter(tax =>
    tax.taxClass?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastTax = currentPage * taxesPerPage;
  const indexOfFirstTax = indexOfLastTax - taxesPerPage;
  const currentTaxes = filteredTaxes.slice(indexOfFirstTax, indexOfLastTax);
  const totalPages = Math.ceil(filteredTaxes.length / taxesPerPage);

  useEffect(() => {
    dispatch(fetchTaxes());
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleModalShow = () => setShowModal(true);

  const handleModalClose = () => {
    setShowModal(false);
    setIsEditMode(false);
    setTaxId("");
    setTaxClass("");
    setTaxValue("");
  };

  const handleEditTax = (tax) => {
    setTaxId(tax._id);
    setTaxClass(tax.taxClass);
    setTaxValue(tax.taxValue);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteTax = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this tax!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTax(id)).then(() => {
          Swal.fire("Deleted!", "Tax has been deleted.", "success");
          dispatch(fetchTaxes());
        });
      }
    });
  };

  const handleTaxFormSubmit = (e) => {
    e.preventDefault();
    if (!taxClass.trim() || !taxValue.trim()) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    const taxData = {
      taxClass,
      taxValue: parseFloat(taxValue)
    };

    if (isEditMode) {
      dispatch(updateTax({ id: taxId, taxData })).then(() => {
        dispatch(fetchTaxes());
        Swal.fire("Updated!", "Tax updated successfully.", "success");
      });
    } else {
      dispatch(createTax(taxData)).then(() => {
        dispatch(fetchTaxes());
        Swal.fire("Created!", "Tax created successfully.", "success");
      });
    }

    handleModalClose();
  };

  return (
    <Container className="mt-5">
      <div className="card p-4 shadow">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-semibold">Manage Taxes</h3>
          <Button
            className="btn text-white rounded px-4 py-2 fw-semibold"
            style={{ backgroundColor: "#06223a" }}
            onClick={handleModalShow}
          >
            <i className="fa-solid fa-plus" /> Add New Tax
          </Button>
        </div>

        <Form.Control
          type="text"
          placeholder="Search by tax class..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3"
        />

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Tax Class</th>
              <th>Tax Value (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center">Loading...</td>
              </tr>
            ) : currentTaxes.length > 0 ? (
              currentTaxes.map((tax, index) => (
                <tr key={tax._id}>
                  <td>{indexOfFirstTax + index + 1}</td>
                  <td>{tax.taxClass}</td>
                  <td>{tax.taxValue}%</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditTax(tax)}
                      className="me-2"
                    >
                      <i className="fa-solid fa-pen" />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteTax(tax._id)}
                    >
                      <i className="fa-solid fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No taxes found.</td>
              </tr>
            )}
          </tbody>
        </Table>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Tax" : "Add New Tax"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTaxFormSubmit}>
            <Form.Group controlId="taxClass">
              <Form.Label>Tax Class</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Tax Class"
                value={taxClass}
                onChange={(e) => setTaxClass(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="taxValue" className="mt-3">
              <Form.Label>Tax Value (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Tax Value"
                value={taxValue}
                onChange={(e) => setTaxValue(e.target.value)}
                required
                min="0"
                step="0.01"
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="ms-2">
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
