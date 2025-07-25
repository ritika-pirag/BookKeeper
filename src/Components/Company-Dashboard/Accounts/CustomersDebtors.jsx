 import React, { useState, useRef } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Card,
  Row,
  Col,
  Badge,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import { FaTrash, FaEye, FaPlus, FaEdit, FaSearch, FaFilter, FaFileImport, FaFileExport, FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";

const emptyCustomer = {
  name: "",
  contact: "",
  email: "",
  taxNumber: "",
  altMobile: "",
  balance: "",
  taxEnabled: false,
  billing: {
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  },
  shipping: {
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  },
};

const getCustomerColumns = () => [
  "name",
  "contact",
  "email",
  "taxNumber",
  "altMobile",
  "balance",
  "taxEnabled",
  "billing.name",
  "billing.phone",
  "billing.address",
  "billing.city",
  "billing.state",
  "billing.country",
  "billing.zip",
  "shipping.name",
  "shipping.phone",
  "shipping.address",
  "shipping.city",
  "shipping.state",
  "shipping.country",
  "shipping.zip",
];

const CustomersDebtors = () => {
  const [customersList, setCustomersList] = useState([
    {
      name: "Lalit Singh",
      contact: "09752100980",
      email: "lalit@example.com",
      taxNumber: "GSTIN123",
      altMobile: "0987654321",
      balance: "5000",
      taxEnabled: true,
      billing: {
        name: "Lalit Singh",
        phone: "09752100980",
        address: "34 Mahal Kachhari Road",
        city: "Indore",
        state: "Madhya Pradesh",
        country: "India",
        zip: "452001",
      },
      shipping: {
        name: "Lalit Singh",
        phone: "09752100980",
        address: "34 Mahal Kachhari Road",
        city: "Indore",
        state: "Madhya Pradesh",
        country: "India",
        zip: "452001",
      },
    }
  ]);
  
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [isTaxEnabled, setIsTaxEnabled] = useState(false);
  const [taxNumber, setTaxNumber] = useState("");

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
  
  const [customerFormData, setCustomerFormData] = useState({
    accountType: "",
  });
  

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(JSON.parse(JSON.stringify(emptyCustomer)));
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [addressFilter, setAddressFilter] = useState("all");
  const [addressFilterValue, setAddressFilterValue] = useState("");

  // Excel import
  const fileInputRef = useRef();

  const handleOpenAddEditModal = (mode, customer = null, index = null) => {
    setEditMode(mode === "edit");
    if (mode === "add") {
      setCurrentCustomer(JSON.parse(JSON.stringify(emptyCustomer)));
    } else {
      setCurrentCustomer(JSON.parse(JSON.stringify(customer)));
    }
    setCurrentIndex(index);
    setShowAddEditModal(true);
  };

  const handleOpenViewModal = (customer) => {
    setCurrentCustomer(customer);
    setShowViewModal(true);
  };

  const handleSave = () => {
    const newCustomer = JSON.parse(JSON.stringify(currentCustomer));
    if (editMode && currentIndex !== null) {
      const updatedList = [...customersList];
      updatedList[currentIndex] = newCustomer;
      setCustomersList(updatedList);
    } else {
      setCustomersList([...customersList, { ...newCustomer, id: customersList.length + 1 }]);
    }
    setShowAddEditModal(false);
    resetModal();
  };

  const handleDelete = () => {
    const updated = customersList.filter((_, idx) => idx !== deleteIndex);
    setCustomersList(updated);
    setShowConfirmDelete(false);
  };

  const resetModal = () => {
    setCurrentCustomer(JSON.parse(JSON.stringify(emptyCustomer)));
    setEditMode(false);
    setCurrentIndex(null);
  };

  const updateField = (path, value) => {
    const keys = path.split(".");
    const updated = JSON.parse(JSON.stringify(currentCustomer));
    let obj = updated;
    while (keys.length > 1) {
      if (!obj[keys[0]]) obj[keys[0]] = {};
      obj = obj[keys.shift()];
    }
    obj[keys[0]] = value;
    setCurrentCustomer(updated);
  };

  const copyBillingToShipping = () => {
    setCurrentCustomer(prev => ({
      ...prev,
      shipping: { ...prev.billing }
    }));
  };

  // Filter customers based on search term and address filter
  const filteredCustomers = customersList.filter(customer => {
    // Search term matching (name, email, contact)
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchTerm.toLowerCase());
    // Address filter matching
    let matchesAddress = true;
    if (addressFilter !== "all" && addressFilterValue) {
      const addressField = addressFilter === "billing" ? customer.billing : customer.shipping;
      matchesAddress = 
        addressField.address.toLowerCase().includes(addressFilterValue.toLowerCase()) ||
        addressField.city.toLowerCase().includes(addressFilterValue.toLowerCase()) ||
        addressField.state.toLowerCase().includes(addressFilterValue.toLowerCase());
    }
    return matchesSearch && matchesAddress;
  });

  // --------- Excel Import/Export/Download Logic ---------
  // Helper: flatten customer for excel row
  const flattenCustomer = (cust) => ({
    name: cust.name,
    contact: cust.contact,
    email: cust.email,
    taxNumber: cust.taxNumber,
    altMobile: cust.altMobile,
    balance: cust.balance,
    taxEnabled: cust.taxEnabled ? "ON" : "OFF",
    "billing.name": cust.billing.name,
    "billing.phone": cust.billing.phone,
    "billing.address": cust.billing.address,
    "billing.city": cust.billing.city,
    "billing.state": cust.billing.state,
    "billing.country": cust.billing.country,
    "billing.zip": cust.billing.zip,
    "shipping.name": cust.shipping.name,
    "shipping.phone": cust.shipping.phone,
    "shipping.address": cust.shipping.address,
    "shipping.city": cust.shipping.city,
    "shipping.state": cust.shipping.state,
    "shipping.country": cust.shipping.country,
    "shipping.zip": cust.shipping.zip,
  });

  // Import Excel
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { defval: "" });
      // Convert flat excel row to customer object
      const imported = data.map(row => {
        const cust = JSON.parse(JSON.stringify(emptyCustomer));
        Object.entries(row).forEach(([key, value]) => {
          if (key.startsWith("billing.") || key.startsWith("shipping.")) {
            const [section, field] = key.split(".");
            cust[section][field] = value;
          } else if (key === "taxEnabled") {
            cust.taxEnabled = value === "ON" || value === true;
          } else {
            cust[key] = value;
          }
        });
        return cust;
      });
      setCustomersList(prev => [...prev, ...imported]);
    };
    reader.readAsBinaryString(file);
  };

  // Export Excel (all fields ever added, including new fields from Add Customer)
  const handleExport = () => {
    // Collect all unique keys from all customers (including new fields)
    const allKeys = new Set();
    customersList.forEach(cust => {
      Object.keys(flattenCustomer(cust)).forEach(key => allKeys.add(key));
    });
    const columns = Array.from(allKeys);

    // Prepare data for export
    const data = customersList.map((cust, idx) => {
      const flat = flattenCustomer(cust);
      // Add No column at the start
      return {
        No: idx + 1,
        ...columns.reduce((acc, key) => ({ ...acc, [key]: flat[key] ?? "" }), {})
      };
    });

    // Ensure No is first column
    const ws = XLSX.utils.json_to_sheet(data, { header: ["No", ...columns] });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Customers");
    XLSX.writeFile(wb, "customers.xlsx");
  };

  // Download Blank Excel (all possible fields, including new fields from Add Customer)
  const handleDownloadBlank = () => {
    // Collect all unique keys from all customers (including new fields)
    const allKeys = new Set();
    customersList.forEach(cust => {
      Object.keys(flattenCustomer(cust)).forEach(key => allKeys.add(key));
    });
    const columns = Array.from(allKeys);

    // Prepare blank row
    const blankRow = {};
    columns.forEach(col => (blankRow[col] = ""));
    const ws = XLSX.utils.json_to_sheet([{ No: "", ...blankRow }], { header: ["No", ...columns] });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Customers");
    XLSX.writeFile(wb, "customer_template.xlsx");
  };

  return (
    <div className="p-4 mt-2">
    <div className="mb-3">
  <Row className="gy-2 align-items-center">
    <Col xs={12} md="auto">
      <h6 className="fw-semibold mb-0">Customer Table</h6>
    </Col>
    <Col xs={12} md>
      <div className="d-flex flex-wrap gap-2 justify-content-md-end">
        {/* Import Button */}
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImport}
        />
        <Button
          variant="success"
          className="rounded-pill d-flex align-items-center"
          style={{ fontWeight: 600 }}
          onClick={() => fileInputRef.current.click()}
          title="Import Excel"
        >
          <FaFileImport className="me-2" /> Import
        </Button>
        <Button
          variant="primary"
          className="rounded-pill d-flex align-items-center"
          style={{ fontWeight: 600 }}
          onClick={handleExport}
          title="Export Excel"
        >
          <FaFileExport className="me-2" /> Export
        </Button>
        <Button
          variant="warning"
          className="rounded-pill d-flex align-items-center"
          style={{ fontWeight: 600, color: "#fff" }}
          onClick={handleDownloadBlank}
          title="Download Blank Excel"
        >
          <FaDownload className="me-2" /> Download
        </Button>
        <Button
          onClick={() => handleOpenAddEditModal("add")}
          size="sm"
          style={{
            backgroundColor: "#53b2a5",
            border: "none",
            display: "flex",
            alignItems: "center",
          }}
          className="rounded-pill"
        >
          <FaPlus className="me-1" />
          <span>Add Customer</span>
        </Button>
      </div>
    </Col>
  </Row>
</div>

      <Card className="rounded-3 p-3">
        {/* Search and Filter Section */}
        <div className="mb-3">
          <Row>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by name, email or phone"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6}></Col>
          </Row>
        </div>
        <Table bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Tax</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((cust, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{cust.name}</td>
                  <td>{cust.contact}</td>
                  <td>{cust.email}</td>
                  <td>${parseFloat(cust.balance || 0).toFixed(2)}</td>
                  <td>
                    <Badge bg={cust.taxEnabled ? "success" : "secondary"}>
                      {cust.taxEnabled ? "ON" : "OFF"}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button variant="outline-info" size="sm" onClick={() => handleOpenViewModal(cust)}>
                        <FaEye />
                      </Button>
                      <Button variant="outline-warning" size="sm" onClick={() => handleOpenAddEditModal("edit", cust, idx)}>
                        <FaEdit />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => { setDeleteIndex(idx); setShowConfirmDelete(true); }}>
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  {customersList.length === 0 ? "No customers found. Add your first customer!" : "No matching customers found."}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
      {/* Add/Edit Modal */}
      <Modal   show={showAddEditModal}
  onHide={() => setShowAddEditModal(false)}
  size="xl"
  centered
  backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>

  <Form>
    <Row className="mb-3">
      {/* LEFT COLUMN */}
      <Col md={6} style={{ borderRight: "1px solid #dee2e6" }}>
        <Form.Group className="mb-3">
          <Form.Label> Name</Form.Label>
          <Form.Control
  type="text"
  placeholder="Enter name"
  value={currentCustomer.name}
  onChange={(e) => updateField("name", e.target.value)}
/>
        </Form.Group>

<Form.Group className="mb-3" controlId="formAccountType">
  <Form.Label>Account Type</Form.Label>
  <Form.Select
    value={customerFormData.accountType}
    onChange={(e) =>
      setCustomerFormData({
        ...customerFormData,
        accountType: e.target.value,
      })
    }
  >
    <option value="">Select</option>
    {accountTypeOptions.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </Form.Select>
</Form.Group>

<p>Selected Account Type: {accountType}</p>

        <Form.Group className="mb-3">
          <Form.Label>Opening Balance</Form.Label>
          <Form.Control type="number" defaultValue={0} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Account Creation Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Form.Check
              label="Bank Details"
              className="mb-3 me-2"
              checked={showBankDetails}
              onChange={(e) => setShowBankDetails(e.target.checked)}
            />

    {/* Conditional Bank Fields */}
    {showBankDetails && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Bank Name & Branch</Form.Label>
                  <Form.Select>
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
              <Form.Select>
                <option>India</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Select>
                <option>-- Select State --</option>
                <option>Madhya Pradesh</option>
                <option>Uttar Pradesh</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Pincode</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State Code</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={12}>
          <Form.Group>
  <Form.Label>Phone Number</Form.Label>
  <Form.Control
    type="text"
    value={currentCustomer.phone || ""}
    onChange={(e) => updateField("phone", e.target.value)}
  />
</Form.Group>

          </Col>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Credit Period</Form.Label>
              <Form.Control type="number" defaultValue={0} />
            </Form.Group>
          </Col>
     
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Email ID</Form.Label>
          <Form.Control
    type="email"
    value={currentCustomer.email}
    onChange={(e) => updateField("email", e.target.value)}
  />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>GSTIN</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>GST Registration Type</Form.Label>
              <Form.Select>
                <option>Unknown</option>
                <option>Registered</option>
                <option>Unregistered</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
      <Col xs={12} md={6}>
        <Form.Group>
          <div className="d-flex justify-content-between align-items-center">
            <Form.Label className="mb-0">Tax</Form.Label>
            <Form.Check
              type="switch"
              id="tax-enabled-switch"
              label={isTaxEnabled ? "ON" : "OFF"}
              checked={isTaxEnabled}
              onChange={(e) => setIsTaxEnabled(e.target.checked)}
            />
          </div>
          {isTaxEnabled && (
            <Form.Control
              type="number"
              placeholder="Enter Tax No."
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
              className="mt-2"
            />
          )}
        </Form.Group>
      </Col>
    </Row>

      </Col>
    </Row>

  
  </Form>
</Modal.Body>

      <Modal.Footer>
  <Button variant="secondary" onClick={() => setShowAddEditModal(false)}>
  Close
  </Button>
  <Button variant="primary" onClick={handleSave}      style={{ backgroundColor: "#53b2a5", border: "none", display: "flex", alignItems: "center" }}>
    Save
  </Button>
</Modal.Footer>

    </Modal>


    
      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-info text-white">
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mb-3">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Basic Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Name:</strong> {currentCustomer.name}</p>
                  <p><strong>Contact:</strong> {currentCustomer.contact}</p>
                  <p><strong>Email:</strong> {currentCustomer.email}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Alternate Mobile:</strong> {currentCustomer.altMobile || "-"}</p>
                  <p><strong>Tax Number:</strong> {currentCustomer.taxNumber || "-"}</p>
                  <p>
                    <strong>Tax Enabled:</strong> 
                    <Badge bg={currentCustomer.taxEnabled ? "success" : "secondary"} className="ms-2">
                      {currentCustomer.taxEnabled ? "ON" : "OFF"}
                    </Badge>
                  </p>
                  <p><strong>Balance:</strong> ${parseFloat(currentCustomer.balance || 0).toFixed(2)}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Billing Address</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                {Object.entries(currentCustomer.billing).map(([key, value], i) => (
                  <Col md={6} key={i}>
                    <p className="mb-2">
                      <strong className="text-capitalize">{key}:</strong> {value || "-"}
                    </p>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header className="bg-light">
              <h5 className="mb-0">Shipping Address</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                {Object.entries(currentCustomer.shipping).map(([key, value], i) => (
                  <Col md={6} key={i}>
                    <p className="mb-2">
                      <strong className="text-capitalize">{key}:</strong> {value || "-"}
                    </p>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this customer?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomersDebtors;  