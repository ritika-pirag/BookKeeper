import React, { useState } from 'react';
import { Button, Modal, Form, Badge } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const Vendors = () => {
  const [vendors, setVendors] = useState([
    { name: "John Smith Vendor", company: "voluptates", email: "", phone: "", payable: 169, credit: 6 },
    { name: "Emily Johnson Vendor", company: "corporis", email: "", phone: "", payable: 616, credit: 121 },
    { name: "David Williams Vendor", company: "velit", email: "", phone: "", payable: 611, credit: 15 },
    { name: "Sarah Brown Vendor", company: "architecto", email: "", phone: "", payable: 648, credit: 552 },
    { name: "Michael Davis Vendor", company: "explicabo", email: "", phone: "", payable: 32, credit: 349 },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: '', company: '', email: '', phone: '', payable: '', credit: '',
  });

  const handleAdd = () => {
    setVendors([...vendors, newVendor]);
    setNewVendor({ name: '', company: '', email: '', phone: '', payable: '', credit: '' });
    setShowAdd(false);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">All Vendors</h4>
        <div className="d-flex gap-2">
          <Badge bg="warning" className="text-dark">
            ⚠️ Update GST details for 520 vendors
          </Badge>
          <Button variant="primary" onClick={() => setShowAdd(true)}>
            <FaPlus className="me-1" /> New
          </Button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th></th>
              <th>NAME</th>
              <th>COMPANY NAME</th>
              <th>EMAIL</th>
              <th>WORK PHONE</th>
              <th>PAYABLES (₹)</th>
              <th>UNUSED CREDITS (₹)</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v, i) => (
              <tr key={i}>
                <td><input type="checkbox" /></td>
                <td>{v.name}</td>
                <td>{v.company}</td>
                <td className="text-muted">{v.email || '—'}</td>
                <td className="text-muted">{v.phone || '—'}</td>
                <td>₹{v.payable}</td>
                <td>₹{v.credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={newVendor.name} onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Company</Form.Label>
              <Form.Control type="text" value={newVendor.company} onChange={(e) => setNewVendor({ ...newVendor, company: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={newVendor.email} onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" value={newVendor.phone} onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Payables (₹)</Form.Label>
              <Form.Control type="number" value={newVendor.payable} onChange={(e) => setNewVendor({ ...newVendor, payable: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Unused Credits (₹)</Form.Label>
              <Form.Control type="number" value={newVendor.credit} onChange={(e) => setNewVendor({ ...newVendor, credit: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAdd}>Add Vendor</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Vendors;
