import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const WareHouses= () => {
  const [warehouses, setWarehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [warehouseName, setWarehouseName] = useState("");
  const [location, setLocation] = useState("");
  const [editId, setEditId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const dummyData = [
      { _id: "1", name: "Central Warehouse", location: "Delhi" },
      { _id: "2", name: "North Zone", location: "Noida" },
      { _id: "3", name: "South Depot", location: "Bangalore" },
      { _id: "4", name: "East Godown", location: "Kolkata" },
      { _id: "5", name: "West Hub", location: "Mumbai" },
      { _id: "6", name: "Spare Store", location: "Hyderabad" },
      { _id: "7", name: "Test Depot", location: "Pune" },
      { _id: "8", name: "Central Hub", location: "Lucknow" },
    ];
    setWarehouses(dummyData);
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setWarehouseName("");
    setLocation("");
    setEditId(null);
  };

  const handleModalShow = (data = null) => {
    if (data) {
      setEditId(data._id);
      setWarehouseName(data.name);
      setLocation(data.location);
    }
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newWarehouse = {
      _id: editId || Date.now().toString(),
      name: warehouseName,
      location: location,
    };

    if (editId) {
      setWarehouses(warehouses.map((w) => (w._id === editId ? newWarehouse : w)));
    } else {
      setWarehouses([...warehouses, newWarehouse]);
    }

    handleModalClose();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this warehouse?");
    if (confirmDelete) {
      setWarehouses(warehouses.filter((w) => w._id !== id));
      alert("Warehouse deleted successfully.");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(warehouses.length / itemsPerPage);
  const currentItems = warehouses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mx-md-5 mt-5 mx-3">
      <div className="shadow p-4">
        <div className="d-flex justify-content-between flex-wrap gap-2">
          <h4 className="fw-semibold">Manage Warehouses</h4>
          <Button
            className="set_btn text-white fw-semibold"
            style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}
            onClick={() => handleModalShow()}
          >
            <i className="fa fa-plus me-2"></i> Create Warehouse
          </Button>
        </div>

        <div className="table-responsive mt-3">
          <Table bordered striped hover>
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Warehouse Name</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((w, index) => (
                  <tr key={w._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{w.name}</td>
                    <td>{w.location}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleModalShow(w)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(w._id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center">No warehouses found</td></tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-2 px-2">
          <span className="small text-muted">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, warehouses.length)} of {warehouses.length} entries
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0 flex-wrap">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link rounded-start"
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    style={currentPage === index + 1 ? { backgroundColor: '#3daaaa', borderColor: '#3daaaa' } : {}}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link rounded-end"
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Warehouse" : "Create Warehouse"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Warehouse Name</Form.Label>
              <Form.Control
                type="text"
                value={warehouseName}
                onChange={(e) => setWarehouseName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={handleModalClose}>Close</Button>
              <Button variant="primary" type="submit" className="ms-2"    style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}>
                {editId ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WareHouses;
