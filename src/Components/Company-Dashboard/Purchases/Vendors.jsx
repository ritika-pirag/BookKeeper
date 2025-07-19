import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
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
    {
      name: "Amit Sharma Vendor",
      company: "globex",
      email: "amit@globex.com",
      phone: "9876543222",
      payable: 1300,
      address: "Pune, India"
    },
    {
      name: "Sara Ali Vendor",
      company: "cyberdyne",
      email: "sara@cyberdyne.ai",
      phone: "9876543333",
      payable: 450,
      address: "Delhi, India"
    },
    {
      name: "Rajesh Mehta Vendor",
      company: "initech",
      email: "rajesh@initech.com",
      phone: "9876543444",
      payable: 760,
      address: "Ahmedabad, India"
    },
    {
      name: "Nina Kapoor Vendor",
      company: "umbrella",
      email: "nina@umbrella.org",
      phone: "9876543555",
      payable: 390,
      address: "Mumbai, India"
    }
  ]);
  

  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredVendors = vendors.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.phone.includes(searchTerm)
  );

  return (
    <div className="mt-4 p-2">
      {/* ✅ Title, Search and Add Button */}
      <Row className="align-items-center mb-3">
  <Col xs={12} md={4} className="mb-1 mb-md-0">
    <h4 className="fw-bold mb-0">Manage Vendors</h4>
  </Col>
  <Col xs={12} md={8}>
    <div className="d-flex gap-2 flex-nowrap">
      <Form.Control
        type="text"
        placeholder="Search vendor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ flex: "1 1 auto" }}
      />
      <Button
        variant="success"
        className="d-flex align-items-center gap-2"
        onClick={() => {
          setNewVendor({
            name: "",
            company: "",
            email: "",
            phone: "",
            payable: "",
            address: "",
            document: null
          });
          setShowAdd(true);
        }}
        style={{ whiteSpace: "nowrap", backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
      >
        <FaPlus /> Add Vendor
      </Button>
    </div>
  </Col>
</Row>


      {/* ✅ Card Starts */}
      <div className="card bg-white rounded-3 p-4">
        {/* Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.length > 0 ? (
                filteredVendors.map((vendor, idx) => (
                  <tr key={idx}>
                    <td>{vendor.name}</td>
                    <td>{vendor.company}</td>
                    <td className="text-muted">{vendor.email}</td>
                    <td className="text-muted">{vendor.phone}</td>
                    <td>{vendor.payable}$</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <Button variant="link" className="p-0 text-info" size="sm"
                          onClick={() => { setSelectedVendor(vendor); setShowView(true); }}>
                          <FaEye size={18} />
                        </Button>
                        <Button variant="link" className="p-0 text-warning" size="sm"
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setNewVendor(vendor);
                            setShowEdit(true);
                          }}>
                          <FaEdit size={18} />
                        </Button>
                        <Button variant="link" className="p-0 text-danger" size="sm"
                          onClick={() => { setSelectedVendor(vendor); setShowDelete(true); }}>
                          <FaTrash size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No vendor found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
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

      {/* Add/Edit Modal */}
      <Modal show={showAdd || showEdit} onHide={() => { setShowAdd(false); setShowEdit(false); }} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{showAdd ? "Add Vendor" : "Edit Vendor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h6 className="mb-3">Basic Info</h6>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={newVendor.name || ''} onChange={handleChange} placeholder="Vendor Name" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={newVendor.email || ''} onChange={handleChange} placeholder="Email Address" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" value={newVendor.phone || ''} onChange={handleChange} placeholder="Contact Number" />
                </Form.Group>
              </Col>
            </Row>

            <h6 className="mb-3">Billing Address</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Company</Form.Label>
                  <Form.Control type="text" name="company" value={newVendor.company || ''} onChange={handleChange} placeholder="Company Name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Payable</Form.Label>
                  <Form.Control type="text" name="payable" value={newVendor.payable || ''} onChange={handleChange} placeholder="Amount Payable" />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Billing Address</Form.Label>
                  <Form.Control type="text" name="address" value={newVendor.address || ''} onChange={handleChange} placeholder="Street, City, Country" />
                </Form.Group>
              </Col>
            </Row>

            <h6 className="mb-3">Shipping Address</h6>
            <Row>
              <Col md={12}>
                <Form.Check type="checkbox" label="Same as Billing Address" name="sameAsBilling" className="mb-2" onChange={handleChange} />
                <p className="text-muted small">Leave blank if not needed on invoice.</p>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control type="text" name="shippingAddress" value={newVendor.shippingAddress || ''} onChange={handleChange} placeholder="Street, City, Country" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowAdd(false); setShowEdit(false); }}>Cancel</Button>
          <Button style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }} onClick={showAdd ? handleAddVendor : handleUpdateVendor}>
            {showAdd ? "Add Vendor" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
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
