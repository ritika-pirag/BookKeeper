import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dummy category options
  const categoryOptions = ["Electronics", "Clothing", "Books", "Groceries", "Shoes"];

  useEffect(() => {
    const dummyData = [
      { _id: "1", brand_name: "Samsung", category: "Electronics" },
      { _id: "2", brand_name: "Nike", category: "Shoes" },
      { _id: "3", brand_name: "Levi's", category: "Clothing" },
      { _id: "4", brand_name: "Nestle", category: "Groceries" },
      { _id: "5", brand_name: "Apple", category: "Electronics" },
      { _id: "6", brand_name: "Zara", category: "Clothing" },
    ];
    setBrands(dummyData);
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setBrandName("");
    setCategory("");
    setEditId(null);
  };

  const handleModalShow = (data = null) => {
    if (data) {
      setEditId(data._id);
      setBrandName(data.brand_name);
      setCategory(data.category);
    }
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newBrand = {
      _id: editId || Date.now().toString(),
      brand_name: brandName,
      category: category,
    };

    if (editId) {
      setBrands(brands.map((b) => (b._id === editId ? newBrand : b)));
    } else {
      setBrands([...brands, newBrand]);
    }

    handleModalClose();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this brand?");
    if (confirmDelete) {
      setBrands(brands.filter((b) => b._id !== id));
      alert("Brand deleted successfully.");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(brands.length / itemsPerPage);
  const currentItems = brands.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mx-md-5 mt-5 mx-3">
      <div className="shadow p-4">
        <div className="d-flex justify-content-between">
          <h4 className="fw-semibold">Manage Brands</h4>
          <Button className="set_btn text-white fw-semibold" onClick={() => handleModalShow()}>
            <i className="fa fa-plus me-2"></i> Create Brand
          </Button>
        </div>

        <div className="table-responsive mt-3">
          <Table bordered striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Brand Name</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((b, index) => (
                  <tr key={b._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{b.brand_name}</td>
                    <td>{b.category}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleModalShow(b)}>
                        <FaEdit />
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(b._id)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center">No brands found</td></tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center gap-2 mt-4">
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </Button>
          <span className="align-self-center">Page {currentPage} of {totalPages}</span>
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Brand" : "Create Brand"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Select Category</Form.Label>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">-- Select Category --</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={handleModalClose}>Close</Button>
              <Button variant="primary" type="submit" className="ms-2">
                {editId ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BrandPage;
