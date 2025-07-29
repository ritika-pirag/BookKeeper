import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const VendorsCreditors = () => {
  const [vendors, setVendors] = useState([
    {
      name: "John Smith Vendor",
      email: "john@example.com",
      phone: "9876543210",
      payable: 24,
      address: "Indore, India"
    },
    {
      name: "Emily Johnson Vendor",
      email: "emily@example.com",
      phone: "9876543211",
      payable: 820,
      address: "Bhopal, India"
    },
    {
      name: "Amit Sharma Vendor",
      email: "amit@globex.com",
      phone: "9876543222",
      payable: 1300,
      address: "Pune, India"
    },
    {
      name: "Sara Ali Vendor",
      email: "sara@cyberdyne.ai",
      phone: "9876543333",
      payable: 450,
      address: "Delhi, India"
    },
    {
      name: "Rajesh Mehta Vendor",
      email: "rajesh@initech.com",
      phone: "9876543444",
      payable: 760,
      address: "Ahmedabad, India"
    },
    {
      name: "Nina Kapoor Vendor",
      email: "nina@umbrella.org",
      phone: "9876543555",
      payable: 390,
      address: "Mumbai, India"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showView, setShowView] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payable: 0
  });
  const [accountType, setAccountType] = useState("");
  const [isTaxEnabled, setIsTaxEnabled] = useState(false);
  const [taxNumber, setTaxNumber] = useState("");
  const [showBankDetails, setShowBankDetails] = useState(false);

  const updateField = (field, value) => {
    setCurrentCustomer(prev => ({ ...prev, [field]: value }));
  };

  const handleAddClick = () => {
    setCurrentCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
      payable: 0
    });
    setAccountType("");
    setTaxNumber("");
    setIsTaxEnabled(false);
    setShowBankDetails(false);
    setShowAddEditModal(true);
  };

  const handleEditClick = (vendor) => {
    setCurrentCustomer(vendor);
    setAccountType(vendor.accountType || "");
    setTaxNumber(vendor.taxNumber || "");
    setIsTaxEnabled(!!vendor.taxNumber);
    setShowBankDetails(!!vendor.accountNumber);
    setSelectedVendor(vendor);
    setShowAddEditModal(true);
  };

  const handleSave = () => {
    if (selectedVendor) {
      // Update existing
      const updated = vendors.map(v =>
        v === selectedVendor ? { ...currentCustomer, accountType, taxNumber } : v
      );
      setVendors(updated);
    } else {
      // Add new
      setVendors([...vendors, { ...currentCustomer, accountType, taxNumber }]);
    }

    setShowAddEditModal(false);
    setSelectedVendor(null);
  };

  const handleDeleteVendor = () => {
    setVendors(vendors.filter(v => v !== selectedVendor));
    setShowDelete(false);
  };

  const filteredVendors = vendors.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.phone.includes(searchTerm)
  );

  const handleDownloadTemplate = () => {
    const headers = [["name", "email", "phone", "payable", "address"]];
    const ws = XLSX.utils.aoa_to_sheet(headers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "VendorsTemplate");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Vendor_Template.xlsx");
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(vendors);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vendors");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Vendors_Export.xlsx");
  };

  const handleImportClick = () => {
    if (window.importFileRef) window.importFileRef.click();
  };

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
  const accountTypeOptions = [
    "Cash-in-hand",
    "Bank A/Cs",
    "Sundry Debtors",
    "Sundry Creditors",
    "Purchases A/C",
    "Purchase Return",
    "Sales A/C",
    "Sales Return",
    "Capital A/C",
    "Direct Expenses",
    "Indirect Expenses",
    "Direct Income",
    "Indirect Income",
    "Current Assets",
    "Current Liabilities",
    "Misc. Expenses",
    "Loans (Liability)",
    "Loans & Advance",
    "Fixed Assets",
    "Investments",
    "Bank OD A/C",
    "Deposits (Assets)",
    "Provisions",
  ];
  
  return (
    <div className="mt-4 p-2">
      <Row className="align-items-center mb-3">
        <Col xs={12} md={4}><h4 className="fw-bold mb-0">Manage Vendors</h4></Col>
        <Col xs={12} md={8}>
          <div className="d-flex flex-wrap gap-2 justify-content-md-end">
            <Button   variant="success"
          className="rounded-pill d-flex align-items-center"onClick={handleImportClick}>Import</Button>
            <input type="file" accept=".xlsx, .xls" ref={(ref) => (window.importFileRef = ref)} onChange={handleImport} style={{ display: "none" }} />
            <Button   variant="primary"
          className="rounded-pill d-flex align-items-center" onClick={handleExport}>Export</Button>


            <Button   variant="warning"
          className="rounded-pill d-flex align-items-center" 
            
            onClick={handleDownloadTemplate}>Download</Button>
            <Button   variant="success"
          className="rounded-pill d-flex align-items-center"
          style={{
            backgroundColor: "#53b2a5",
            border: "none",
            display: "flex",
            alignItems: "center",
          }}
             onClick={handleAddClick}>
              <FaPlus /> Add Vendor
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-3 justify-content-start">
        <Col xs={12} md={6} lg={4}>
          <Form.Control type="text" placeholder="Search vendor..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-pill" />
        </Col>
      </Row>

      <div className="card bg-white rounded-3 p-4">
  <div className="table-responsive">
    <table className="table table-hover table-bordered align-middle mb-0">
      <thead className="table-light border">
        <tr>
          <th>NO.</th>
          <th>Name</th>
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
              <td>{idx + 1}</td>
              <td>{vendor.name}</td>
              <td>{vendor.email}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.payable}$</td>
              <td>
                <div className="d-flex flex-wrap gap-2">
                  <Button
                    variant="link"
                    className="p-0 text-info"
                    size="sm"
                    onClick={() => {
                      setSelectedVendor(vendor);
                      setShowView(true);
                    }}
                  >
                    <FaEye />
                  </Button>
                  <Button
                    variant="link"
                    className="p-0 text-warning"
                    size="sm"
                    onClick={() => handleEditClick(vendor)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="link"
                    className="p-0 text-danger"
                    size="sm"
                    onClick={() => {
                      setSelectedVendor(vendor);
                      setShowDelete(true);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center text-muted">
              No vendor found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>


      {/* View Modal */}
  {/* View Modal */}
<Modal show={showView} onHide={() => setShowView(false)} centered size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Vendor Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedVendor && (
      <>
        {/* Basic Info */}
        <div className="border rounded p-3 mb-4">
          <h6 className="fw-semibold mb-3">Basic Information</h6>
          <Row>
            <Col md={6}><p><strong>Name:</strong> {selectedVendor.name}</p></Col>
            <Col md={6}><p><strong>Phone:</strong> {selectedVendor.phone}</p></Col>
            <Col md={6}><p><strong>Email:</strong> {selectedVendor.email}</p></Col>
            <Col md={6}><p><strong>Account Type:</strong> {selectedVendor.accountType || "N/A"}</p></Col>
<Col md={6}><p><strong> Balance:</strong> {selectedVendor.payable}</p></Col>
            <Col md={6}><p><strong>Credit Period:</strong> {selectedVendor.creditPeriod || "N/A"}</p></Col>
            <Col md={6}><p><strong>Account Creation Date:</strong> {selectedVendor.creationDate || "N/A"}</p></Col>
          </Row>            
        </div>

        {/* Billing Info */}
        <div className="border rounded p-3 mb-4">
          <h6 className="fw-semibold mb-3">Billing Information</h6>
          <Row>
            <Col md={6}><p><strong>Address:</strong> {selectedVendor.address}</p></Col>
            <Col md={6}><p><strong>Country:</strong> {selectedVendor.country || "India"}</p></Col>
            <Col md={6}><p><strong>State:</strong> {selectedVendor.state || "N/A"}</p></Col>
            <Col md={6}><p><strong>Pincode:</strong> {selectedVendor.pincode || "N/A"}</p></Col>
            <Col md={6}><p><strong>State Code:</strong> {selectedVendor.stateCode || "N/A"}</p></Col>
          </Row>
        </div>

        {/* Shipping Info */}
        <div className="border rounded p-3 mb-4">
          <h6 className="fw-semibold mb-3">Shipping Information</h6>
          <Row>
            <Col md={12}><p><strong>Shipping Address:</strong> {selectedVendor.shippingAddress || "N/A"}</p></Col>
          </Row>
        </div>

        {/* Bank Info */}
        {selectedVendor.bankDetails && (
          <div className="border rounded p-3 mb-4">
            <h6 className="fw-semibold mb-3">Bank Details</h6>
            <Row>
              <Col md={6}><p><strong>Account Number:</strong> {selectedVendor.bankDetails.accountNumber}</p></Col>
              <Col md={6}><p><strong>IFSC:</strong> {selectedVendor.bankDetails.ifsc}</p></Col>
              <Col md={6}><p><strong>Bank Name & Branch:</strong> {selectedVendor.bankDetails.bankName}</p></Col>
            </Row>
          </div>
        )}

        {/* Tax Info */}
        <div className="border rounded p-3 mb-2">
          <h6 className="fw-semibold mb-3">Tax Information</h6>
          <Row>
            <Col md={6}><p><strong>Tax Number:</strong> {selectedVendor.taxNumber || "N/A"}</p></Col>
            <Col md={6}><p><strong>GSTIN:</strong> {selectedVendor.gstin || "N/A"}</p></Col>
            <Col md={6}><p><strong>GST Type:</strong> {selectedVendor.gstType || "Unknown"}</p></Col>
          </Row>
        </div>
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowView(false)}>Close</Button>
  </Modal.Footer>
</Modal>


      <Modal show={showAddEditModal} onHide={() => setShowAddEditModal(false)} size="xl" centered backdrop="static">
  <Modal.Header closeButton className="bg-light">
    <Modal.Title>{selectedVendor ? "Edit Vendor" : "Add Vendor"}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Row className="mb-3">
        {/* LEFT COLUMN */}
        <Col md={6} style={{ borderRight: "1px solid #dee2e6" }}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={currentCustomer.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </Form.Group>

      
          <Form.Group className="mb-3">
  <Form.Label>Account Type</Form.Label>
  <Form.Select
    value={currentCustomer.accountType || ""}
    onChange={(e) => updateField("accountType", e.target.value)}
  >
    <option value="">-- Select Account Type --</option>
    {accountTypeOptions.map((type, idx) => (
      <option key={idx} value={type}>
        {type}
      </option>
    ))}
  </Form.Select>
</Form.Group>
     <Form.Group className="mb-3">
          <Form.Label> Balance</Form.Label>
          <Form.Control type="number" defaultValue={0} />
        </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Account Creation Date</Form.Label>
            <Form.Control
              type="date"
              value={currentCustomer.creationDate}
              onChange={(e) => updateField("creationDate", e.target.value)}
            />
          </Form.Group>

          <Form.Check
            label="Bank Details"
            className="mb-3"
            checked={showBankDetails}
            onChange={(e) => setShowBankDetails(e.target.checked)}
          />

          {showBankDetails && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  type="text"
                  value={currentCustomer.bankDetails?.accountNumber || ""}
                  onChange={(e) =>
                    updateField("bankDetails.accountNumber", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>IFSC Code</Form.Label>
                <Form.Control
                  type="text"
                  value={currentCustomer.bankDetails?.ifsc || ""}
                  onChange={(e) =>
                    updateField("bankDetails.ifsc", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Bank Name & Branch</Form.Label>
                <Form.Select
                  value={currentCustomer.bankDetails?.bankName || ""}
                  onChange={(e) =>
                    updateField("bankDetails.bankName", e.target.value)
                  }
                >
                  <option>-- Select Bank --</option>
                  <option>SBI - MG Road</option>
                  <option>HDFC - Indore</option>
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Col>

        {/* RIGHT COLUMN */}
        <Col md={6}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Select
                  value={currentCustomer.country || "India"}
                  onChange={(e) => updateField("country", e.target.value)}
                >
                  <option>India</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Select
                  value={currentCustomer.state || ""}
                  onChange={(e) => updateField("state", e.target.value)}
                >
                  <option>-- Select State --</option>
                  <option>Madhya Pradesh</option>
                  <option>Uttar Pradesh</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              value={currentCustomer.pincode || ""}
              onChange={(e) => updateField("pincode", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> Shipping Address</Form.Label>
            <Form.Control
              type="text"
              value={currentCustomer.address || ""}
              onChange={(e) => updateField("address", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>State Code</Form.Label>
            <Form.Control
              type="text"
              value={currentCustomer.stateCode || ""}
              onChange={(e) => updateField("stateCode", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control
              type="text"
              value={currentCustomer.shippingAddress || ""}
              onChange={(e) => updateField("shippingAddress", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={currentCustomer.phone || ""}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Credit Period</Form.Label>
            <Form.Control
              type="number"
              value={currentCustomer.creditPeriod || 0}
              onChange={(e) => updateField("creditPeriod", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={currentCustomer.email || ""}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>GSTIN</Form.Label>
                <Form.Control
                  type="text"
                  value={currentCustomer.gstin || ""}
                  onChange={(e) => updateField("gstin", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>GST Registration Type</Form.Label>
                <Form.Select
                  value={currentCustomer.gstType || "Unknown"}
                  onChange={(e) => updateField("gstType", e.target.value)}
                >
                  <option>Unknown</option>
                  <option>Registered</option>
                  <option>Unregistered</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

        </Col>
      </Row>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowAddEditModal(false)}>Close</Button>
    <Button variant="primary" onClick={handleSave} style={{ backgroundColor: "#53b2a5", border: "none" }}>
      Save
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

export default VendorsCreditors;
