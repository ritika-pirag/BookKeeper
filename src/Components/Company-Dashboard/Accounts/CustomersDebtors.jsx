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
  const accountTypes = ["Assets", "Liabilities", "Income", "Expenses"];

  const predefinedAccounts = {
    Assets: [
      "Cash in Hand", "Bank Account", "Petty Cash", "Accounts Receivable", "Inventory",
      "Fixed Assets", "Prepaid Expenses", "Investments", "Advance to Suppliers", "Deposits",
      "Furniture & Fixtures", "Land", "Building", "Vehicles", "Machinery",
      "Tools", "Computer Equipment", "Office Equipment", "Intangible Assets", "Goodwill",
      "Loan to Employees", "Security Deposits", "Advance Tax", "Deferred Tax Asset", "Accrued Income",
      "Work in Progress", "Raw Materials", "Spare Parts", "Prepaid Insurance", "Other Current Assets"
    ],
    Liabilities: [
      "Accounts Payable", "Loans Payable", "Accrued Expenses", "Credit Card", "Deferred Revenue",
      "GST Payable", "TDS Payable", "Provident Fund Payable", "ESIC Payable", "Salary Payable",
      "Advance from Customers", "Interest Payable", "Bills Payable", "Mortgage Payable", "Unearned Income",
      "Long-term Loans", "Short-term Loans", "Duties & Taxes Payable", "Contingent Liability", "Bonus Payable",
      "Gratuity Payable", "Audit Fees Payable", "Professional Tax Payable", "Rent Payable", "Outstanding Expenses",
      "Security Deposit Received", "Bank Overdraft", "Statutory Dues", "Tax Provision", "Other Current Liabilities"
    ],
    Income: [
      "Sales", "Service Income", "Commission Received", "Interest Income", "Rental Income",
      "Discount Received", "Dividend Income", "Profit on Sale of Assets", "Foreign Exchange Gain", "Consultancy Income",
      "Freight Collected", "Other Operating Revenue", "Non-Operating Income", "Sponsorship Income", "Incentive Received",
      "Miscellaneous Income", "Royalty Income", "Grant Received", "Reimbursement Received", "Insurance Claim Received",
      "Admission Fee", "Training Fee", "Tuition Fee", "Subscription Income", "Workshop Income",
      "Software Sales", "Digital Products", "Hosting Services", "Consulting Projects", "Other Income"
    ],
    Expenses: [
      "Rent", "Salaries", "Wages", "Electricity", "Internet Charges",
      "Office Supplies", "Postage & Courier", "Travel Expenses", "Fuel Expenses", "Telephone",
      "Legal Fees", "Audit Fees", "Bank Charges", "Insurance", "Repairs & Maintenance",
      "Advertising", "Marketing", "Printing & Stationery", "Software Subscription", "Freight Outward",
      "Training Expenses", "Staff Welfare", "Interest Paid", "Depreciation", "Consulting Charges",
      "Security Expenses", "Packing Expenses", "License Fees", "GST Paid", "Miscellaneous Expenses"
    ],
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

  {/* Customer Table */}
  <Table bordered hover responsive>
    <thead className="table-light">
      <tr>
        {/* <th>No</th> */}
        <th>Voucher No</th> 
        <th>Name</th>
        <th>Contact</th>
        <th>Email</th>
        <th>Balance</th>
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
              <div className="d-flex gap-2 justify-content-center">
                <button className="p-0 text-info" onClick={() => handleOpenViewModal(cust)}>
                  <FaEye size={16}/>
                </button>
                <button className="p-0 text-warning" onClick={() => handleOpenAddEditModal("edit", cust, idx)}>
                  <FaEdit />
                </button>
                <button className="p-0 text-danger" onClick={() => { setDeleteIndex(idx); setShowConfirmDelete(true); }}>
                  <FaTrash />
                </button>
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

  {/* Pagination Section */}
  <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
    <small className="text-muted ms-2">

 1 to {filteredCustomers.length} of {customersList.length} results
    </small>
    <nav>
      <ul className="pagination mb-0">
        <li className="page-item disabled">
          <button className="page-link">&laquo;</button>
        </li>
        <li className="page-item active">
          <button className="page-link">1</button>
        </li>
        <li className="page-item">
          <button className="page-link">2</button>
        </li>
        <li className="page-item">
          <button className="page-link">&raquo;</button>
        </li>
      </ul>
    </nav>
  </div>
</Card>

      {/* Add/Edit Modal */}
      <Modal   show={showAddEditModal}
  onHide={() => setShowAddEditModal(false)}
  size="xl"
  centered
  backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>Add Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={customerFormData.name}
              onChange={(e) => setCustomerFormData({ ...customerFormData, name: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Account Type</Form.Label>
            <Form.Control
              as="select"
              value={customerFormData.accountType}
              onChange={(e) => {
                setCustomerFormData({ 
                  ...customerFormData, 
                  accountType: e.target.value,
                  accountName: "" // Reset account name when type changes
                });
              }}
            >
              <option value="">Select Account Type</option>
              {["Assets", "Liabilities", "Income", "Expenses"].map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Account Name</Form.Label>
            <Form.Control
              as="select"
              value={customerFormData.accountName}
              onChange={(e) => setCustomerFormData({ ...customerFormData, accountName: e.target.value })}
              disabled={!customerFormData.accountType}
            >
              <option value="">Select Account Name</option>
              {customerFormData.accountType && 
                (predefinedAccounts[customerFormData.accountType] || []).map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))
              }
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
    <Form.Group>
      <Form.Label>Balance Type</Form.Label>
      <Form.Control
  as="select"
  value={customerFormData.balanceType}
  onChange={(e) => setCustomerFormData({ ...customerFormData, balanceType: e.target.value })}
      >
        <option value="">Select Type</option>
        <option value="Debit">Debit</option>
        <option value="Credit">Credit</option>
      </Form.Control>
    </Form.Group>
  </Col>


  
      </Row>
      <Row className="mb-3" >
      <Row className="mb-3">
  <Col md={6}>
    <Form.Group>
      <Form.Label>Opening Balance</Form.Label>
      <Form.Control
        type="number"
        value={customerFormData.payable}
        onChange={(e) => {
          const value = e.target.value;
          setCustomerFormData({
            ...customerFormData,
            payable: value,
          });
        }}
      />
    </Form.Group>
  </Col>

  <Col md={6}>
    <Form.Group>
      <Form.Label>Current Balance</Form.Label>
      <Form.Control
        type="number"
        value={customerFormData.currentBalance}
        onChange={(e) => {
          const value = e.target.value;
          setCustomerFormData({
            ...customerFormData,
            currentBalance: value,
          });
        }}
      />
    </Form.Group>
  </Col>
</Row>

</Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Creation Date</Form.Label>
            <Form.Control
              type="date"
              value={customerFormData.creationDate}
              onChange={(e) => setCustomerFormData({ ...customerFormData, creationDate: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Bank Account Number</Form.Label>
            <Form.Control
              type="text"
              value={customerFormData.bankAccountNumber}
              onChange={(e) => setCustomerFormData({ ...customerFormData, bankAccountNumber: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Bank IFSC</Form.Label>
            <Form.Control
              type="text"
              value={customerFormData.bankIFSC}
              onChange={(e) => setCustomerFormData({ ...customerFormData, bankIFSC: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Bank Name & Branch</Form.Label>
            <Form.Control
              type="text"
              value={customerFormData.bankName}
              onChange={(e) => setCustomerFormData({ ...customerFormData, bankName: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              value={customerFormData.country}
              onChange={(e) => setCustomerFormData({ ...customerFormData, country: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              value={customerFormData.state}
              onChange={(e) => setCustomerFormData({ ...customerFormData, state: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              value={customerFormData.pincode}
              onChange={(e) => setCustomerFormData({ ...customerFormData, pincode: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={customerFormData.address}
              onChange={(e) => setCustomerFormData({ ...customerFormData, address: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>State Code</Form.Label>
            <Form.Control
              type="text"
              value={customerFormData.stateCode}
              onChange={(e) => setCustomerFormData({ ...customerFormData, stateCode: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control
              type="text"
              value={customerFormData.shippingAddress}
              onChange={(e) => setCustomerFormData({ ...customerFormData, shippingAddress: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={customerFormData.phone}
              onChange={(e) => setCustomerFormData({ ...customerFormData, phone: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={customerFormData.email}
              onChange={(e) => setCustomerFormData({ ...customerFormData, email: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Credit Period (days)</Form.Label>
            <Form.Control
              type="number"
              value={customerFormData.creditPeriod}
              onChange={(e) => setCustomerFormData({ ...customerFormData, creditPeriod: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>GSTIN</Form.Label>
            <Form.Control
              type="text"
              value={customerFormData.gstin}
              onChange={(e) => setCustomerFormData({ ...customerFormData, gstin: e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>GST Type</Form.Label>
            <Form.Control
              as="select"
              value={customerFormData.gstType}
              onChange={(e) => setCustomerFormData({ ...customerFormData, gstType: e.target.value })}
            >
              <option>Registered</option>
              <option>Unregistered</option>
              <option>Composition</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Tax Enabled</Form.Label>
            <Form.Check
              type="switch"
              checked={customerFormData.taxEnabled}
              onChange={(e) => setCustomerFormData({ ...customerFormData, taxEnabled: e.target.checked })}
              label={customerFormData.taxEnabled ? "Yes" : "No"}
            />
            {customerFormData.taxEnabled && (
              <Form.Control
                type="text"
                placeholder="Tax Number"
                className="mt-2"
                value={customerFormData.taxNumber}
                onChange={(e) => setCustomerFormData({ ...customerFormData, taxNumber: e.target.value })}
              />
            )}
          </Form.Group>
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





        {/* Page Description */}
        <Card className="mb-4 p-3 shadow rounded-4 mt-2">
  <Card.Body>
    <p className="text-muted text-center fs-6 mb-0">
    This page allows you to manage customer records, track balances, and perform actions like add, view, edit, or delete customers.
    </p>
  </Card.Body>
</Card>
    </div>
  );
};

export default CustomersDebtors;  