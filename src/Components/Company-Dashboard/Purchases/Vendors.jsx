import React, { useState } from 'react';
import { Modal, Button, Badge, Form } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Vendors = () => {
  const [vendors, setVendors] = useState([
    {
      name: "John Smith Vendor",
      company: "earum",
      email: "john@example.com",
      phone: "9876543210",
      payable: 24,
      credit: 865,
    },
    {
      name: "Emily Johnson Vendor",
      company: "natus",
      email: "emily@example.com",
      phone: "9876543211",
      payable: 820,
      credit: 369,
    },
  ]);

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    payable: "",
    credit: "",
    document: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "document") {
      setNewVendor({ ...newVendor, document: files[0] });
    } else {
      setNewVendor({ ...newVendor, [name]: value });
    }
  };

  const handleAddVendor = () => {
    setVendors([...vendors, newVendor]);
    setNewVendor({
      name: "",
      company: "",
      email: "",
      phone: "",
      payable: "",
      credit: "",
      document: null
    });
    setShowAdd(false);
  };

  const handleUpdateVendor = () => {
    const updated = vendors.map((v) =>
      v === selectedVendor ? { ...newVendor } : v
    );
    setVendors(updated);
    setShowEdit(false);
  };

  const handleDeleteVendor = () => {
    setVendors(vendors.filter((v) => v !== selectedVendor));
    setShowDelete(false);
  };

  return (
    <div className="container-fluid px-2 px-md-5 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold" style={{ color: "#1976D2" }}>Vendors</h4>
        <Button variant="primary" onClick={() => setShowAdd(true)}>
          <FaPlus className="me-1" /> Add Vendor
        </Button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-semibold">Vendor Details</h5>
        <Badge pill bg="warning" className="text-dark">
          Update GST details for 520 vendors
        </Badge>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Payables (₹)</th>
              <th>Unused Credits (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, idx) => (
              <tr key={idx}>
                <td>{vendor.name}</td>
                <td>{vendor.company}</td>
                <td className="text-muted">{vendor.email}</td>
                <td className="text-muted">{vendor.phone}</td>
                <td>₹{vendor.payable}</td>
                <td>₹{vendor.credit}</td>
                <td className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setSelectedVendor(vendor);
                      setShowView(true);
                    }}
                  >
                    <FaEye />
                  </Button>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => {
                      setSelectedVendor(vendor);
                      setNewVendor(vendor);
                      setShowEdit(true);
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      setSelectedVendor(vendor);
                      setShowDelete(true);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      <Modal show={showView} onHide={() => setShowView(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Vendor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVendor && (
            <ul className="list-group">
              {Object.entries(selectedVendor).map(([key, value]) => (
                <li className="list-group-item d-flex justify-content-between" key={key}>
                  <span className="text-capitalize text-secondary">{key.replace("_", " ")}</span>
                  <span className="fw-semibold text-dark">{value?.name || value}</span>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit Modal */}
      <Modal show={showAdd || showEdit} onHide={() => { setShowAdd(false); setShowEdit(false); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>{showAdd ? "Add Vendor" : "Edit Vendor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["name", "company", "email", "phone", "payable", "credit"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label className="text-capitalize">{field}</Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={newVendor[field]}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
            <Form.Group className="mb-3">
              <Form.Label>Upload Document</Form.Label>
              <Form.Control
                type="file"
                name="document"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowAdd(false); setShowEdit(false); }}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={showAdd ? handleAddVendor : handleUpdateVendor}
          >
            {showAdd ? "Add Vendor" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this vendor?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteVendor}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Vendors;
