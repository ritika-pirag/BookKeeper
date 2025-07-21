import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";




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




// 📥 DOWNLOAD TEMPLATE
const handleDownloadTemplate = () => {
  const headers = [["name", "company", "email", "phone", "payable", "address"]];
  const ws = XLSX.utils.aoa_to_sheet(headers);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "VendorsTemplate");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Vendor_Template.xlsx");
};

// 📤 EXPORT EXISTING VENDOR DATA
const handleExport = () => {
  const ws = XLSX.utils.json_to_sheet(vendors);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Vendors");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Vendors_Export.xlsx");
};

// 📥 TRIGGER FILE INPUT
const handleImportClick = () => {
  if (window.importFileRef) window.importFileRef.click();
};

// 📤 IMPORT FROM EXCEL TO STATE
const handleImport = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (evt) => {
    const bstr = evt.target.result;
    const workbook = XLSX.read(bstr, { type: "binary" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(firstSheet);

    setVendors((prev) => [...prev, ...data]);
  };

  reader.readAsBinaryString(file);
};




  return (
    <div className="mt-4 p-2">
      {/* ✅ Title, Search and Add Button */}
{/* Title and Action Buttons */}
{/* Title and Action Buttons */}
<Row className="align-items-center mb-3">
  <Col xs={12} md={4} className="mb-2 mb-md-0">
    <h4 className="fw-bold mb-0">Manage Vendors</h4>
  </Col>
  <Col xs={12} md={8}>
    <div className="d-flex flex-wrap gap-2 justify-content-md-end">
   

      <Button
        className="rounded-pill"
        style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
        onClick={handleImportClick}
      >
        <i className="fas fa-file-import me-2" /> Import
      </Button>

      <Button
        className="rounded-pill"
        style={{ backgroundColor: "#fd7e14", borderColor: "#fd7e14" }}
        onClick={handleExport}
      >
        <i className="fas fa-file-export me-2" /> Export
      </Button>

      <Button
        className="rounded-pill"
        style={{ backgroundColor: "#ffc107", borderColor: "#ffc107" }}
        onClick={handleDownloadTemplate}
      >
        <i className="fas fa-download me-2" /> Download
      </Button>

      <input
        type="file"
        accept=".xlsx, .xls"
        ref={(ref) => (window.importFileRef = ref)}
        onChange={handleImport}
        style={{ display: "none" }}
      />
         <Button
        variant="success"
        className="rounded-pill d-flex align-items-center gap-2"
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

{/* Search bar - smaller and centered above table */}
<Row className="mb-3 justify-content-start">
  <Col xs={12} md={6} lg={4}>
    <Form.Control
      type="text"
      placeholder="Search vendor..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="rounded-pill"
    />
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
      <Modal show={showView} onHide={() => setShowView(false)} centered size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Vendor Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedVendor && (
      <>
        {/* Basic Information */}
        <div className="border rounded p-3 mb-4">
          <h6 className="fw-semibold mb-3">Basic Information</h6>
          <Row>
            <Col md={6}><p><strong>Name:</strong> {selectedVendor.name}</p></Col>
         
            <Col md={6}><p><strong>Phone:</strong> {selectedVendor.phone}</p></Col>
            <Col md={6}><p><strong>Email:</strong> {selectedVendor.email}</p></Col>
      
            
        
          </Row>
        </div>

        {/* Billing Address */}
        <div className="border rounded p-3 mb-4">
          <h6 className="fw-semibold mb-3">Billing Address</h6>
          <Row>
            <Col md={6}><p><strong>Name:</strong> {selectedVendor.name}</p></Col>
            <Col md={6}><p><strong>Phone:</strong> {selectedVendor.phone}</p></Col>
            <Col md={12}><p><strong>Address:</strong> {selectedVendor.address}</p></Col>
            <Col md={4}><p><strong>City:</strong> {selectedVendor.city}</p></Col>
            <Col md={4}><p><strong>State:</strong> {selectedVendor.state}</p></Col>
            <Col md={4}><p><strong>Zip:</strong> {selectedVendor.zip}</p></Col>
            <Col md={4}><p><strong>Country:</strong> {selectedVendor.country || "India"}</p></Col>
          </Row>
        </div>

        {/* Shipping Address */}
        <div className="border rounded p-3">
          <h6 className="fw-semibold mb-3">Shipping Address</h6>
          <Row>
            <Col md={6}><p><strong>Name:</strong> {selectedVendor.name}</p></Col>
            <Col md={6}><p><strong>Phone:</strong> {selectedVendor.phone}</p></Col>
            <Col md={12}><p><strong>Address:</strong> {selectedVendor.address}</p></Col>
            <Col md={4}><p><strong>City:</strong> {selectedVendor.city}</p></Col>
            <Col md={4}><p><strong>State:</strong> {selectedVendor.state}</p></Col>
            <Col md={4}><p><strong>Zip:</strong> {selectedVendor.zip}</p></Col>
            <Col md={4}><p><strong>Country:</strong> {selectedVendor.country || "India"}</p></Col>
          </Row>
        </div>
      </>
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
