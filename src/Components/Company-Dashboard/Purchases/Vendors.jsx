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
      address: "Indore, India"
    },
    {
      name: "Emily Johnson Vendor",
      company: "natus",
      email: "emily@example.com",
      phone: "9876543211",
      payable: 820,
      address: "Bhopal, India"
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
    address: "",
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
      address: "",
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
 <div className="card bg-white rounded-3 p-4  mt-6 ">
  <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 gap-2">
    <h5 className="fw-semibold mb-0">Vendor Details</h5>
    <Badge pill bg="warning" className="text-dark">
      Update GST details for 520 vendors
    </Badge>
  </div>

  <div className="table-responsive">
    <table className="table table-hover align-middle mb-0">
      <thead className="table-light">
        <tr>
          <th>Name</th>
          <th>Company</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Payables (₹)</th>
          <th>Address</th>
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
            <td>{vendor.address}</td>
            <td>
              <div className="d-flex flex-wrap gap-2">
                <Button variant="link" className="p-0 text-info" size="sm"
                  onClick={() => { setSelectedVendor(vendor); setShowView(true); }}>
                  <FaEye size={18} />
                </Button>
                <Button variant="link" className="p-0 text-warning" size="sm"
                  onClick={() => { setSelectedVendor(vendor); setNewVendor(vendor); setShowEdit(true); }}>
                  <FaEdit size={18} />
                </Button>
                <Button variant="link" className="p-0 text-danger" size="sm"
                  onClick={() => { setSelectedVendor(vendor); setShowDelete(true); }}>
                  <FaTrash size={18} />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination inside card */}
  <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 gap-2">
    <span className="small text-muted">
      Showing 1 to {vendors.length} of {vendors.length} results
    </span>
    <nav>
      <ul className="pagination pagination-sm mb-0 flex-wrap">
        <li className="page-item disabled">
          <button className="page-link rounded-start">&laquo;</button>
        </li>
        <li className="page-item active">
          <button
            className="page-link"
            style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}
          >1</button>
        </li>
        <li className="page-item"><button className="page-link">2</button></li>
        <li className="page-item">
          <button className="page-link rounded-end">&raquo;</button>
        </li>
      </ul>
    </nav>
  </div>
        {/* Modals (same as before) */}
      {/* View Vendor */}
      <Modal show={showView} onHide={() => setShowView(false)} centered>
        <Modal.Header closeButton><Modal.Title>Vendor Details</Modal.Title></Modal.Header>
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

      {/* Add / Edit Vendor */}
      <Modal show={showAdd || showEdit} onHide={() => { setShowAdd(false); setShowEdit(false); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>{showAdd ? "Add Vendor" : "Edit Vendor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["name", "company", "email", "phone", "payable", "address"].map((field) => (
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
              <Form.Control type="file" name="document" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowAdd(false); setShowEdit(false); }}>Cancel</Button>
          <Button variant="primary" onClick={showAdd ? handleAddVendor : handleUpdateVendor}>
            {showAdd ? "Add Vendor" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Vendor */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
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
