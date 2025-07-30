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
  const [vendorFormData, setVendorFormData] = useState({
    balanceType: "",
    accountType: "",
    payable: "", // Opening Balance
    currentBalance: "", // Current Balance
  });
  
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
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.name}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, name: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
          <Form.Group>
            <Form.Label>Account Type</Form.Label>
            <Form.Control
              as="select"
              value={vendorFormData.accountType}
              onChange={(e) => {
                setVendorFormData({ 
                  ...vendorFormData, 
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
    value={vendorFormData.accountName}
    onChange={(e) => setVendorFormData({ ...vendorFormData, accountName: e.target.value })}
    disabled={!vendorFormData.accountType}
  >
    <option value="">Select Account Name</option>
    {vendorFormData.accountType && 
      (predefinedAccounts[vendorFormData.accountType] || []).map((name, index) => (
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
  value={vendorFormData.balanceType}
  onChange={(e) =>
    setVendorFormData({ ...vendorFormData, balanceType: e.target.value })
  }
>
  <option value="">Select Balance Type</option>
  <option value="debit">Debit (Receivable)</option>
  <option value="credit">Credit (Payable)</option>
</Form.Control>

    </Form.Group>
  </Col>
      

            </Row>

            <Row className="mb-3">
  <Col md={6}>
    <Form.Group>
      <Form.Label>Opening Balance</Form.Label>
      <Form.Control
        type="number"
        value={vendorFormData.payable}
        onChange={(e) =>
          setVendorFormData({
            ...vendorFormData,
            payable: e.target.value,
            currentBalance: e.target.value // opening balance ke sath hi update
          })
        }
      />
    </Form.Group>
  </Col>

  <Col md={6}>
    <Form.Group>
      <Form.Label>Current Balance</Form.Label>
      <Form.Control
        type="number"
        value={vendorFormData.currentBalance}
        onChange={(e) =>
          setVendorFormData({
            ...vendorFormData,
            currentBalance: e.target.value
          })
        }
      />
    </Form.Group>
  </Col>
</Row>


            <Row className="mb-3">


            <Col md={6}>
                <Form.Group>
                  <Form.Label>Creation Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={vendorFormData.creationDate}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, creationDate: e.target.value })}
                  />
                </Form.Group>
              </Col>


              <Col md={6}>
                <Form.Group>
                  <Form.Label>Bank Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.bankAccountNumber}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, bankAccountNumber: e.target.value })}
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
                    value={vendorFormData.bankIFSC}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, bankIFSC: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Bank Name & Branch</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.bankName}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, bankName: e.target.value })}
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
                    value={vendorFormData.country}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, country: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.state}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, state: e.target.value })}
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
                    value={vendorFormData.pincode}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, pincode: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.address}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, address: e.target.value })}
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
                    value={vendorFormData.stateCode}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, stateCode: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.shippingAddress}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, shippingAddress: e.target.value })}
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
                    value={vendorFormData.phone}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, phone: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={vendorFormData.email}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, email: e.target.value })}
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
                    value={vendorFormData.creditPeriod}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, creditPeriod: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>GSTIN</Form.Label>
                  <Form.Control
                    type="text"
                    value={vendorFormData.gstin}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, gstin: e.target.value })}
                  />
                </Form.Group>
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
