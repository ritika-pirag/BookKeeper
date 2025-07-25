import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  Badge,
} from "react-bootstrap";
import {
  FaFilePdf,
  FaFileExcel,
  FaPlusCircle,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPrint,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Expense = () => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editExpense, setEditExpense] = useState(null);
  const [deleteExpense, setDeleteExpense] = useState(null);
  const [activeTab, setActiveTab] = useState("direct"); // Track active tab: "direct" or "indirect"

  // Updated expenses data with Direct/Indirect Account
  const expenses = [
    {
      date: "3 Sep 2035",
      expenseAccount: "delectus",
      accountType: "Direct", // Added account type
      reference: "REF-001",
      vendorName: "Vendor A",
      paidThrough: "Bank Transfer",
      customerName: "Customer X",
      status: "Paid",
      amount: " 222.01",
    },
    {
      date: "2 Dec 2031",
      expenseAccount: "accusantium",
      accountType: "Indirect", // Added account type
      reference: "REF-002",
      vendorName: "Vendor B",
      paidThrough: "Credit Card",
      customerName: "Customer Y",
      status: "Pending",
      amount: " 3182.56",
    },
    {
      date: "10 Nov 2031",
      expenseAccount: "deserunt",
      accountType: "Direct", // Added account type
      reference: "REF-003",
      vendorName: "Vendor C",
      paidThrough: "PayPal",
      customerName: "Customer Z",
      status: "Paid",
      amount: "4814.85",
    },
    {
      date: "27 Nov 2031",
      expenseAccount: "aut",
      accountType: "Indirect", // Added account type
      reference: "REF-004",
      vendorName: "Vendor D",
      paidThrough: "Bank Transfer",
      customerName: "Customer W",
      status: "Rejected",
      amount: "4557.35",
    },
    {
      date: "15 Jan 2032",
      expenseAccount: "dummy",
      accountType: "Direct", // Added account type
      reference: "REF-005",
      vendorName: "Vendor E",
      paidThrough: "Cash",
      customerName: "Customer V",
      status: "Paid",
      amount: " 1200.00",
    },
    {
      date: "22 Feb 2032",
      expenseAccount: "example",
      accountType: "Indirect", // Added account type
      reference: "REF-006",
      vendorName: "Vendor F",
      paidThrough: "Credit Card",
      customerName: "Customer U",
      status: "Pending",
      amount: " 750.50",
    },
    {
      date: "5 Mar 2032",
      expenseAccount: "test",
      accountType: "Direct", // Added account type
      reference: "REF-007",
      vendorName: "Vendor G",
      paidThrough: "Bank Transfer",
      customerName: "Customer T",
      status: "Paid",
      amount: " 3200.00",
    },
    {
      date: "18 Apr 2032",
      expenseAccount: "sample",
      accountType: "Indirect", // Added account type
      reference: "REF-008",
      vendorName: "Vendor H",
      paidThrough: "PayPal",
      customerName: "Customer S",
      status: "Rejected",
      amount: " 1890.25",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return "badge bg-success";
      case "Pending":
        return "badge bg-warning text-dark";
      case "Rejected":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  // Show Edit Modal
  const handleEdit = (expense) => {
    setEditExpense(expense);
  };

  // Show Delete Modal
  const handleDelete = (expense) => {
    setDeleteExpense(expense);
  };

  // Confirm Delete
  const confirmDelete = () => {
    // ...delete logic here (e.g. API call or state update)
    setDeleteExpense(null);
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
    <div className="bg-light p-4 mt-1 product-header">
      {/* Header */}
      <div className="d-flex justify-content-between gap-4 mb-4">
        <div>
          <h5 className="fw-bold mb-1">Expense</h5>
          <p className="text-muted mb-0">Manage your Expense</p>
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button className="btn btn-light border text-danger coupon-btn-icon">
            <FaFilePdf />
          </button>
          <button className="btn btn-light border text-success coupon-btn-icon">
            <FaFileExcel />
          </button>
          <button
            className="btn text-white d-flex align-items-center gap-2"
            style={{ backgroundColor: "#3daaaa" }}
            data-bs-toggle="modal"
            data-bs-target="#addExpenseModal"
          >
            <FaPlusCircle />
            Add Expenses
          </button>
        </div>
      </div>

      {/* Tabs for Direct and Indirect Expenses */}
      <Tabs
        id="expense-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="direct" title="Direct Expense">
          {/* Direct Expense Content */}
          <div className="table-responsive">
            <table className="table table-bordered text-center align-middle product-table mb-0">
              <thead className="table-light text-white">
                <tr>
                  <th className="py-3">DATE</th>
                  <th className="py-3">EXPENSE ACCOUNT</th>
                  <th className="py-3">REFERENCE#</th>
                  <th className="py-3">VENDOR NAME</th>
                  <th className="py-3">PAID THROUGH</th>
                  <th className="py-3">CUSTOMER NAME</th>
                  <th className="py-3">STATUS</th>
                  <th className="py-3">AMOUNT</th>
                  <th className="py-3">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {expenses
                  .filter((expense) => expense.accountType === "Direct")
                  .map((expense, idx) => (
                    <tr key={idx}>
                      <td>{expense.date}</td>
                      <td>{expense.expenseAccount}</td>
                      <td>{expense.reference}</td>
                      <td>{expense.vendorName}</td>
                      <td>{expense.paidThrough}</td>
                      <td>{expense.customerName}</td>
                      <td>
                        <span className={getStatusBadge(expense.status)}>
                          {expense.status}
                        </span>
                      </td>
                      <td>{expense.amount}</td>
                      <td className="d-flex gap-2 justify-content-center">
                        <button
                          className="btn outline-info btn-sm py-1 px-1 text-info"
                          data-bs-toggle="modal"
                          data-bs-target="#expenseDetailModal"
                          onClick={() => setSelectedExpense(expense)}
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          className="btn outline-primary btn-sm text-warning py-1 px-1"
                          data-bs-toggle="modal"
                          data-bs-target="#editExpenseModal"
                          onClick={() => handleEdit(expense)}
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          className="btn outline-primary btn-sm text-danger py-2 px-1"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteExpenseModal"
                          onClick={() => handleDelete(expense)}
                        >
                          <FaTrash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Tab>
        <Tab eventKey="indirect" title="Indirect Expense">
          {/* Indirect Expense Content */}
          <div className="table-responsive">
            <table className="table table-bordered text-center align-middle product-table mb-0">
              <thead className="table-light text-white">
                <tr>
                  <th className="py-3">DATE</th>
                  <th className="py-3">EXPENSE ACCOUNT</th>
                  <th className="py-3">REFERENCE#</th>
                  <th className="py-3">VENDOR NAME</th>
                  <th className="py-3">PAID THROUGH</th>
                  <th className="py-3">CUSTOMER NAME</th>
                  <th className="py-3">STATUS</th>
                  <th className="py-3">AMOUNT</th>
                  <th className="py-3">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {expenses
                  .filter((expense) => expense.accountType === "Indirect")
                  .map((expense, idx) => (
                    <tr key={idx}>
                      <td>{expense.date}</td>
                      <td>{expense.expenseAccount}</td>
                      <td>{expense.reference}</td>
                      <td>{expense.vendorName}</td>
                      <td>{expense.paidThrough}</td>
                      <td>{expense.customerName}</td>
                      <td>
                        <span className={getStatusBadge(expense.status)}>
                          {expense.status}
                        </span>
                      </td>
                      <td>{expense.amount}</td>
                      <td className="d-flex gap-2 justify-content-center">
                        <button
                          className="btn outline-info btn-sm py-1 px-1 text-info"
                          data-bs-toggle="modal"
                          data-bs-target="#expenseDetailModal"
                          onClick={() => setSelectedExpense(expense)}
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          className="btn outline-primary btn-sm text-warning py-1 px-1"
                          data-bs-toggle="modal"
                          data-bs-target="#editExpenseModal"
                          onClick={() => handleEdit(expense)}
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          className="btn outline-primary btn-sm text-danger py-2 px-1"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteExpenseModal"
                          onClick={() => handleDelete(expense)}
                        >
                          <FaTrash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Tab>
      </Tabs>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3 px-3">
        <span className="small text-muted">
          Showing 1 to {expenses.length} of {expenses.length} results
        </span>
        <nav>
          <ul className="pagination pagination-sm mb-0">
            <li className="page-item disabled">
              <button className="page-link rounded-start">&laquo;</button>
            </li>
            <li className="page-item active">
              <button
                className="page-link"
                style={{ backgroundColor: '#3daaaa', borderColor: '#3daaaa' }}
              >
                1
              </button>
            </li>
            <li className="page-item">
              <button className="page-link">2</button>
            </li>
            <li className="page-item">
              <button className="page-link rounded-end">&raquo;</button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Add Expense Modal */}
      <div
        className="modal fade"
        id="addExpenseModal"
        tabIndex="-1"
        aria-labelledby="addExpenseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="addExpenseModalLabel">
                Add Expense
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Expense Account <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter expense account"
                  />
                </div>
            
            
                <div className="mb-3">
  <label className="form-label fw-semibold">
    Account Type <span className="text-danger">*</span>
  </label>
  <select className="form-select account-type-dropdown">
    <option value="">Select account type</option>
    {accountTypeOptions.map((type, index) => (
      <option key={index} value={type}>{type}</option>
    ))}
  </select>
</div>
                {/* 🔴 Reference Number field removed */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Vendor Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter vendor name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Paid Through <span className="text-danger">*</span>
                    </label>
                    <select className="form-select">
                      <option>Select payment method</option>
                      <option>Bank Transfer</option>
                      <option>Credit Card</option>
                      <option>PayPal</option>
                      <option>Cash</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter customer name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter amount"
                  />
                </div>
                {/* ✅ Status field converted to input */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter status (e.g. Paid, Pending)"
                  />
                </div>
                <div className="d-flex justify-content-end gap-3 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning text-white px-4"
                    style={{ backgroundColor: "#3daaaa" }}
                  >
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Details Modal */}
      <div
        className="modal fade"
        id="expenseDetailModal"
        tabIndex="-1"
        aria-labelledby="expenseDetailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="expenseDetailModalLabel">
                Expense Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setSelectedExpense(null)}
              ></button>
            </div>
            <div className="modal-body">
              {selectedExpense && (
                <div className="table-responsive">
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-semibold">Date</td>
                        <td>{selectedExpense.date}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Expense Account</td>
                        <td>{selectedExpense.expenseAccount}</td>
                      </tr>
                      {/* ✅ Added Account Type to Details Modal */}
                      <tr>
                        <td className="fw-semibold">Account Type</td>
                        <td>{selectedExpense.accountType}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Vendor Name</td>
                        <td>{selectedExpense.vendorName}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Paid Through</td>
                        <td>{selectedExpense.paidThrough}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Customer Name</td>
                        <td>{selectedExpense.customerName}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Status</td>
                        <td>{selectedExpense.status}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Amount</td>
                        <td>{selectedExpense.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Expense Modal */}
      <div
        className="modal fade"
        id="editExpenseModal"
        tabIndex="-1"
        aria-labelledby="editExpenseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="editExpenseModalLabel">
                Edit Expense
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setEditExpense(null)}
              ></button>
            </div>
            <div className="modal-body">
              {editExpense && (
                <form>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      defaultValue={editExpense.date}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Expense Account <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={editExpense.expenseAccount}
                    />
                  </div>
                  {/* ✅ Added Account Type field to Edit Modal */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Account Type <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" defaultValue={editExpense.accountType}>
                      <option value="Direct">Direct</option>
                      <option value="Indirect">Indirect</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Reference Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={editExpense.reference}
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Vendor Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={editExpense.vendorName}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Paid Through <span className="text-danger">*</span>
                      </label>
                      <select className="form-select" defaultValue={editExpense.paidThrough}>
                        <option>Bank Transfer</option>
                        <option>Credit Card</option>
                        <option>PayPal</option>
                        <option>Cash</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={editExpense.customerName}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Amount <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={editExpense.amount}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Status</label>
                    <select className="form-select" defaultValue={editExpense.status}>
                      <option>Paid</option>
                      <option>Pending</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-end gap-3 mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-warning text-white px-4"
                      style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Expense Modal */}
      <div
        className="modal fade"
        id="deleteExpenseModal"
        tabIndex="-1"
        aria-labelledby="deleteExpenseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0" style={{ borderRadius: 16 }}>
            <div className="modal-body text-center py-4">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: 70,
                  height: 70,
                  background: "#FFF5F2",
                  borderRadius: "50%",
                }}
              >
                <FaTrash size={32} color="#F04438" />
              </div>
              <h4 className="fw-bold mb-2">Delete Expense</h4>
              <p className="mb-4" style={{ color: "#555", fontSize: "1.08rem" }}>
                Are you sure you want to delete this expense?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-dark px-4 py-2"
                  data-bs-dismiss="modal"
                  onClick={() => setDeleteExpense(null)}
                >
                  No, Cancel
                </button>
                <button
                  className="btn"
                  style={{ background: "#3daaaa", color: "#fff", fontWeight: 600, padding: "0.5rem 2rem" }}
                  data-bs-dismiss="modal"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;