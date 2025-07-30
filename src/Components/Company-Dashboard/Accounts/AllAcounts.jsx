



import React, { useState, useEffect } from "react"; // Added useEffect import
import {
  Table,
  Container,
  Card,
  Button,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import { FaUserPlus, FaUserFriends } from "react-icons/fa";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// Mock API object for demonstration. Replace with your actual API client.
const api = {
  get: async (url) => {
    if (url === "/accounts/parents") {
       // Mock data for parent accounts
       // In a real app, this would be an API call like: return fetch(`/api${url}`).then(res => res.json());
      return Promise.resolve({ data: [
        { _id: '1', name: 'Assets' },
        { _id: '2', name: 'Liabilities' },
        { _id: '3', name: 'Equity' },
        { _id: '4', name: 'Income' },
        { _id: '5', name: 'Expenses' },
      ]});
    }
    return Promise.resolve({ data: [] });
  },
  post: async (url, data) => {
    console.log("Mock API POST to", url, "with data:", data);
    // In a real app, this would be an API call like: return fetch(`/api${url}`, { method: 'POST', body: JSON.stringify(data) }).then(res => res.json());
    return Promise.resolve({ data: { _id: Date.now().toString(), ...data } });
  }
};

const accountData = [
  { type: "Cash-in-hand", rows: [{ name: "Cash", bal: "0.00" },{ name: "  ", bal: "  " }] },
  { type: "Bank A/Cs", rows: [{ name: "Bank", bal: "0.00" }] },
  {
    type: "Sundry Debtors",
    rows: [
      { name: "Customer A", bal: "0.00" },
      { name: "Customer B", bal: "0.00" },
      { name: "Customer C", bal: "0.00" },
    ],
  },
  {
    type: "Sundry Creditors",
    rows: [
      { name: "Supplier A", bal: "0.00" },
      { name: "Supplier B", bal: "0.00" },
    ],
  },
  { type: "Purchases A/C", rows: [{ name: "Purchase", bal: "0.00" }] },
  { type: "Purchases Return", rows: [{ name: "Purchases Return", bal: "0.00" }] },
  { type: "Sales A/C", rows: [{ name: "Sales", bal: "0.00" }] },
  { type: "Sales Return", rows: [{ name: "Sales Return", bal: "0.00" }] },
  {
    type: "Capital A/C",
    rows: [
      { name: "Capital", bal: "0.00" },
      { name: "Profit & Loss A/c", bal: "0.00" },
    ],
  },
  {
    type: "Direct Expenses",
    rows: [
      { name: "Cartage", bal: "0.00" },
      { name: "Discount On Sale", bal: "0.00" },
      { name: "Discount given", bal: "0.00" },
    ],
  },
  {
    type: "Indirect Expenses",
    rows: [{ name: "Advertisement expenses", bal: "0.00" }],
  },
];

const AllAccounts = () => {
  // State declarations
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showMainAccountModal, setShowMainAccountModal] = useState(false);
  const [mainAccountName, setMainAccountName] = useState("");
  const [customerFormData, setCustomerFormData] = useState({
    name: "",
    accountType: "Sundry Debtors",
    payable: "",
    creationDate: "",
    bankAccountNumber: "",
    bankIFSC: "",
    bankName: "",
    country: "",
    state: "",
    pincode: "",
    address: "",
    stateCode: "",
    shippingAddress: "",
    phone: "",
    email: "",
    creditPeriod: "",
    gstin: "",
    gstType: "Registered",
    taxEnabled: true,
    taxNumber: "",
  });

  const [vendorFormData, setVendorFormData] = useState({
    name: "",
    accountType: "Sundry Creditors",
    payable: "",
    creationDate: "",
    bankAccountNumber: "",
    bankIFSC: "",
    bankName: "",
    country: "",
    state: "",
    pincode: "",
    address: "",
    stateCode: "",
    shippingAddress: "",
    phone: "",
    email: "",
    creditPeriod: "",
    gstin: "",
    gstType: "Registered",
    taxEnabled: true,
    taxNumber: "",
  });

  const [accountType, setAccountType] = useState("Sundry Creditors");
  const [isTaxEnabled, setIsTaxEnabled] = useState(true);
  const [taxNumber, setTaxNumber] = useState("TAX123456");
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(true);
  const [newAccountData, setNewAccountData] = useState({
    type: "",
    name: "",
    bankAccountNumber: "",
    bankIFSC: "",
    bankNameBranch: "",
    parentId: "", // Added for parent account selection
    isDefault: false, // Added for main account creation
  });

  // ✅ FIXED: Added state for parentAccounts
  const [parentAccounts, setParentAccounts] = useState([]); // Initialize as empty array
  const [loadingParentAccounts, setLoadingParentAccounts] = useState(false); // Optional: for loading state


  useEffect(() => {
    const fetchParentAccounts = async () => {
      setLoadingParentAccounts(true);
      try {
        // Replace with your actual API endpoint
        const response = await api.get("/accounts/parents");
        setParentAccounts(response.data);
      } catch (error) {
        console.error("Failed to fetch parent accounts:", error);
        // Optionally, set an error state to display a message to the user
      } finally {
        setLoadingParentAccounts(false);
      }
    };


    fetchParentAccounts();
  }, []); 

  // Handlers
  const handleSaveVendor = () => {
    console.log("Vendor Saved:", vendorFormData);
    setShowVendorModal(false);
  };

  const handleSaveCustomer = () => {
    console.log("Customer Saved:", customerFormData);
    setShowCustomerModal(false);
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
  const [selectedAccount, setSelectedAccount] = useState(null);
const [showView, setShowView] = useState(false);
const [showEdit, setShowEdit] = useState(false);
const [showDelete, setShowDelete] = useState(false);

const handleViewAccount = (type, name) => {
  setSelectedAccount({ type, name });
  setShowView(true);
};

const handleEditAccount = (type, name) => {
  setSelectedAccount({ type, name });
  setShowEdit(true);
};

const handleDeleteAccount = (type, name) => {
  setSelectedAccount({ type, name });
  setShowDelete(true);
};
  return (
    <Container fluid className="py-4">
      {/* Header Row */}
      <Row className="align-items-center justify-content-between mb-3">
        <Col xs={12} md="auto">
          <h4 className="fw-bold text-start mb-2 mb-md-0">All Accounts</h4>
        </Col>
        <Col xs={12} md="auto" className="d-flex gap-2">
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
            className="d-flex align-items-center gap-2 text-white fw-semibold"
            onClick={() => setShowNewAccountModal(true)}
          >
            + Add New Account
          </Button>
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
            className="d-flex align-items-center gap-2 text-white fw-semibold"
            onClick={() => setShowVendorModal(true)}
          >
            <FaUserPlus size={18} />
            Add Vendor
          </Button>
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none" }}
            className="d-flex align-items-center gap-2"
            onClick={() => setShowCustomerModal(true)}
          >
            <FaUserFriends />
            Add Customer
          </Button>
        </Col>
      </Row>

      {/* Table */}
{/* Table */}
<Card>
  <Card.Body>
    <div className="table-responsive">
      <Table bordered hover className="align-middle text-center">
        <thead className="table-light">
          <tr>
            <th>Account Type</th>
            <th>Account Name</th>
            <th>Balance</th>
            <th>Total Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accountTypes.map((type) => (
            <React.Fragment key={type}>
              <tr className="bg-light">
                <td colSpan="5" className="text-start fw-bold">{type}</td>
              </tr>
              {predefinedAccounts[type].map((accountName, index) => (
                <tr key={`${type}-${index}`}>
                  <td className="text-start">{type}</td>
                  <td className="text-start">{accountName}</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                      <Button variant="link" className="p-0 text-info" size="sm" onClick={() => handleViewAccount(type, accountName)} title="View">
                        <FaEye size={16} />
                      </Button>
                      <Button variant="link" className="p-0 text-warning" size="sm" onClick={() => handleEditAccount(type, accountName)} title="Edit">
                        <FaEdit size={16} />
                      </Button>
                      <Button variant="link" className="p-0 text-danger" size="sm" onClick={() => handleDeleteAccount(type, accountName)} title="Delete">
                        <FaTrash size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>

    {/* Pagination */}
    <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
      <small className="text-muted ms-2">Showing 1 to 3 of 3 results</small>
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
  </Card.Body>
</Card>


      {/* Vendor Modal */}
      <Modal
        show={showVendorModal}
        onHide={() => setShowVendorModal(false)}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Add Vendor</Modal.Title>
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
                  <Form.Label> Balance</Form.Label>
                  <Form.Control
                    type="number"
                    value={vendorFormData.payable}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, payable: e.target.value })}
                  />
                </Form.Group>
              </Col>

            </Row>

<Row className="mb-3">
<Col md={6}>
    <Form.Group>
      <Form.Label>Balance Type</Form.Label>
      <Form.Control
        as="select"
        value={vendorFormData.balanceType}
        onChange={(e) => setVendorFormData({ ...vendorFormData, balanceType: e.target.value })}
      >
        <option value="">Select Type</option>
        <option value="Debit">Debit</option>
        <option value="Credit">Credit</option>
      </Form.Control>
    </Form.Group>
  </Col>
    
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

</Row>
            <Row className="mb-3">


      

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

            </Row>
            <Row className="mb-3">
         
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
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>GST Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={vendorFormData.gstType}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, gstType: e.target.value })}
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
                    checked={vendorFormData.taxEnabled}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, taxEnabled: e.target.checked })}
                    label={vendorFormData.taxEnabled ? "Yes" : "No"}
                  />
                  {vendorFormData.taxEnabled && (
                    <Form.Control
                      type="text"
                      placeholder="Tax Number"
                      className="mt-2"
                      value={vendorFormData.taxNumber}
                      onChange={(e) => setVendorFormData({ ...vendorFormData, taxNumber: e.target.value })}
                    />
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVendorModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none" }}
            onClick={handleSaveVendor}
          >
            Save Vendor
          </Button>
        </Modal.Footer>
      </Modal>

 {/* Customer Modal */}
<Modal
  show={showCustomerModal}
  onHide={() => setShowCustomerModal(false)}
  size="lg"
  centered
  backdrop="static"
>
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
            <Form.Label>Balance</Form.Label>
            <Form.Control
              type="number"
              value={customerFormData.payable}
              onChange={(e) => setCustomerFormData({ ...customerFormData, payable: e.target.value })}
            />
          </Form.Group>
        </Col>


  
      </Row>
      <Row className="mb-3" >
<Col md={6}>
    <Form.Group>
      <Form.Label>Balance Type</Form.Label>
      <Form.Control
        as="select"
        value={vendorFormData.balanceType}
        onChange={(e) => setVendorFormData({ ...vendorFormData, balanceType: e.target.value })}
      >
        <option value="">Select Type</option>
        <option value="Debit">Debit</option>
        <option value="Credit">Credit</option>
      </Form.Control>
    </Form.Group>
  </Col>

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
    <Button variant="secondary" onClick={() => setShowCustomerModal(false)}>
      Cancel
    </Button>
    <Button
      style={{ backgroundColor: "#53b2a5", border: "none" }}
      onClick={handleSaveCustomer}
    >
      Save Customer
    </Button>
  </Modal.Footer>
</Modal>



      {/* Add New Account Modal */}
      <Modal
        show={showNewAccountModal}
        onHide={() => setShowNewAccountModal(false)}
        centered
        backdrop="static"
        size="lg"
          dialogClassName="w-100"
      >

<div     
    >
        <Modal.Header closeButton className="bg-light"   >
          <Modal.Title>Add New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>




        <Form>


{/* 
            <Form.Group className="mb-3">
              <Form.Label>Main Account</Form.Label>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>

                <Form.Select
                  value={newAccountData.parentId || ""}
                  onChange={(e) =>
                    setNewAccountData({
                      ...newAccountData,
                      parentId: e.target.value,
           
                      isDefault: false,
                    })
                  }
                  disabled={loadingParentAccounts} 
                >
                  <option value="">Select Parent Account</option>
         
                  {parentAccounts.map((acc) => (
                    <option key={acc._id} value={acc._id}>{acc.name}</option>
                  ))}
                </Form.Select>
                <Button
                  size="sm"
                  onClick={() => setShowMainAccountModal(true)}
                  style={{
                    color: "#53b2a5",
                    border: "1px solid #53b2a5",
                    backgroundColor: "transparent",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#53b2a5";
                    e.target.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#53b2a5";
                  }}
                >
                  Add Main Account
                </Button>

              </div>
              <Form.Text className="text-muted">
                Leave parent blank if creating top-level account.
              </Form.Text>
            </Form.Group> */}









{/* Account Type Dropdown */}
<Form.Group className="mb-3">
  <Form.Label>Account Type</Form.Label>
  <Form.Select
    value={newAccountData.type}
    onChange={(e) => {
      const selectedType = e.target.value;
      setNewAccountData({
        ...newAccountData,
        type: selectedType,
        name: "", // reset name when type changes
      });
    }}
  >
    <option value="">Select Account Type</option>
    {accountTypes.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </Form.Select>
</Form.Group>

{/* Account Name Dropdown Based on Type */}
{newAccountData.type && (
  <Form.Group className="mb-3">
    <Form.Label>Account Name</Form.Label>
    <Form.Select
      value={newAccountData.name}
      onChange={(e) =>
        setNewAccountData({ ...newAccountData, name: e.target.value })
      }
    >
      <option value="">Select Account Name</option>
      {predefinedAccounts[newAccountData.type].map((accName, i) => (
        <option key={i} value={accName}>
          {accName}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
)}
<Form.Group className="mb-3">
  <Form.Label>Account Holder</Form.Label>
  <Form.Control
    type="text"
    value={newAccountData.holder || ""}
    onChange={(e) =>
      setNewAccountData({ ...newAccountData, holder: e.target.value })
    }
  />
</Form.Group>



            {/* Bank Toggle */}
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Add Bank Details"
                checked={showBankDetails}
                onChange={() => setShowBankDetails(!showBankDetails)}
              />
            </Form.Group>
            {/* Bank Fields */}
            {showBankDetails && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAccountData.bankAccountNumber}
                    onChange={(e) =>
                      setNewAccountData({
                        ...newAccountData,
                        bankAccountNumber: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAccountData.bankIFSC}
                    onChange={(e) =>
                      setNewAccountData({
                        ...newAccountData,
                        bankIFSC: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Bank Name & Branch</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAccountData.bankNameBranch}
                    onChange={(e) =>
                      setNewAccountData({
                        ...newAccountData,
                        bankNameBranch: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </>
            )}
          </Form>








        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewAccountModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
            onClick={async () => {
              try {
                // Replace with your actual API endpoint
                await api.post("/accounts", newAccountData);
                // Optional: Refresh the account list or parent accounts if needed
                // const refreshed = await api.get("/accounts/parents");
                // setParentAccounts(refreshed.data);
                setShowNewAccountModal(false);
              } catch (error) {
                 console.error("Failed to save new account:", error);
                 // Optionally, show an error message to the user
              }
            }}
          >
            Save
          </Button>
        </Modal.Footer>

        </div>


      </Modal>


























      {/* Mini Modal for Main Account Name Input */}
      <Modal
        show={showMainAccountModal}
        onHide={() => setShowMainAccountModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Main Account</Modal.Title>
        </Modal.Header>




        <Modal.Body>
          <Form.Group>
            <Form.Label>Account Name</Form.Label>
            <Form.Control
              type="text"
              value={mainAccountName}
              onChange={(e) => setMainAccountName(e.target.value)}
              placeholder="Enter account name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMainAccountModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
             try {
               // Replace with your actual API endpoint
               const res = await api.post("/accounts", {
                 name: mainAccountName,
                 type: "main", // Assuming 'main' is a valid type
                 parentId: null,
                 isDefault: true,
               });
               const newMain = res.data;
               // Update newAccountData with the newly created main account's ID
               setNewAccountData({
                 ...newAccountData,
                 parentId: newMain._id,
                 // If selecting a main account, isDefault might be relevant,
                 // but typically if it's a parent, isDefault is not applicable.
                 // Let's keep it as false unless there's a specific need.
                 // isDefault: true, // Or false, depending on logic
                 isDefault: false, // More likely, as it's now a parent
               });
               // Refresh the parent accounts list to include the new one
               const refreshed = await api.get("/accounts/parents");
               setParentAccounts(refreshed.data);
               setMainAccountName(""); // Clear the input
               setShowMainAccountModal(false); // Close the modal
             } catch (error) {
                console.error("Failed to create main account:", error);
                // Optionally, show an error message to the user
             }
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>



{/* View Account Modal */}
<Modal show={showView} onHide={() => setShowView(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Account Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedAccount && (
      <div>
        <p><strong>Account Type:</strong> {selectedAccount.type}</p>
        <p><strong>Account Name:</strong> {selectedAccount.name}</p>
        <p><strong>Balance:</strong> 0.00</p>
        <p><strong>Total Balance:</strong> 0.00</p>
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowView(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

{/* Edit Account Modal */}
<Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Edit Account</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedAccount && (
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Account Type</Form.Label>
          <Form.Control
            as="select"
            value={selectedAccount.type || ''}
            onChange={(e) => setSelectedAccount(prev => ({
              ...prev,
              type: e.target.value
            }))}
          >
            <option value="" disabled>Select account type</option>
            {accountTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Account Name</Form.Label>
          <Form.Control
            type="text"
            value={selectedAccount.name || ''}
            onChange={(e) => setSelectedAccount(prev => ({
              ...prev,
              name: e.target.value
            }))}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Balance</Form.Label>
          <Form.Control
            type="number"
            value={selectedAccount.balance || "0.00"}
            onChange={(e) => setSelectedAccount(prev => ({
              ...prev,
              balance: parseFloat(e.target.value) || 0
            }))}
          />
        </Form.Group>
      </Form>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowEdit(false)}>
      Cancel
    </Button>
    <Button 
      style={{ backgroundColor: "#53b2a5", border: "none" }}
      onClick={() => {
        console.log("Account updated:", selectedAccount);
        setShowEdit(false);
        // Add your save logic here (e.g., API call to update account)
      }}
    >
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>



{/* Delete Confirmation Modal */}
<Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Deletion</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedAccount && (
      <p>Are you sure you want to delete the account "{selectedAccount.name}" ({selectedAccount.type})? This action cannot be undone.</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowDelete(false)}>
      Cancel
    </Button>
    <Button 
      variant="danger"
      onClick={() => {
        console.log("Account deleted:", selectedAccount);
        setShowDelete(false);
      }}
    >
      Delete Account
    </Button>
  </Modal.Footer>
</Modal>


    </Container>
  );
};

export default AllAccounts;

















